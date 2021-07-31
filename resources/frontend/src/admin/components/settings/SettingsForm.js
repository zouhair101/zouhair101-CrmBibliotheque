import React, {createRef, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import settingsFormValidate from '../settings/settingsFormValidate';
import './Settings.scss';
import {publicImagePath} from "../../../appConstant";
import {languageOptions, settingsDisplayName, settingsKey} from "../../constants";
import Select from '../../../shared/components/Select';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import ImagePicker from "../../../shared/image-picker/ImagePicker";
import {getFormattedMessage, getFormattedOptions, mapCurrencyCode} from '../../../shared/sharedMethod';
import ImageCropper from '../../../shared/components/ImageCropper';
import {toggleModal} from "../../../store/action/modalAction";
import {imagePicker} from "../../../shared/custom-hooks";

const SettingsForm = (props) => {
    const {
        currencies, initialValues, change, onChangeAppLogo, toggleModal,
        onSaveSettings, handleSubmit, onChangeAppFavicon
    } = props;
    const [groupText, setGroupText] = useState(initialValues.currency ? initialValues.currency.symbol : null);
    const settingRef = createRef();
    const [logoRef, setLogoRef] = useState(null);
    const [faviconRef, setFaviconRef] = useState(null);
    const [isToggleLogo, setToggleLogo] = useState(false);
    const [isToggleFavicon, setToggleFavicon] = useState(false);
    const [logo, isDefaultLogo, logoFile, onLogoChange, onRemoveLogo] = imagePicker(change,
        publicImagePath.APP_LOGO, publicImagePath.APP_LOGO,
        !(!!initialValues.library_logo),
    );
    const [favicon, isDefaultFavicon, faviconFile, onFaviconChange, onRemoveFavicon] = imagePicker(change,
        publicImagePath.APP_FAVICON, publicImagePath.APP_FAVICON,
        !(!!initialValues.library_favicon),
    );
    const bookLanguagesOptions = getFormattedOptions(languageOptions);

    useEffect(() => {
        settingRef.current.focus();
    }, []);

    const onSelectCurrency = (option) => {
        if (option) setGroupText(option.symbol)
    };

    const prepareFormData = (key, value, display_name) => {
        return { key, value, display_name };
    };

    const onSave = (formValues) => {
        const { currency, issue_due_days, return_due_days, library_name, language, reserve_books_limit,
            issue_books_limit, penalty_per_day, book_due_reminder_before_days } = formValues;
        const settings = [
            prepareFormData(settingsKey.CURRENCY, currency.id, currency.name),
            prepareFormData(settingsKey.LIBRARY_NAME, library_name, settingsDisplayName.APP_NAME),
            prepareFormData(settingsKey.PENALTY_PER_DAY, penalty_per_day, settingsDisplayName.PENALTY_PER_DAY),
            prepareFormData(settingsKey.ISSUE_DUE_DAYS, issue_due_days, settingsDisplayName.ISSUE_DUE_DAYS),
            prepareFormData(settingsKey.RETURN_DUE_DAYS, return_due_days, settingsDisplayName.RETURN_DUE_DAYS),
            prepareFormData(settingsKey.LANGUAGE, language.id, language.name),
            prepareFormData(settingsKey.RESERVE_BOOKS_LIMIT, reserve_books_limit, settingsDisplayName.RESERVE_BOOKS_LIMIT),
            prepareFormData(settingsKey.ISSUE_BOOKS_LIMIT, issue_books_limit, settingsDisplayName.ISSUE_BOOKS_LIMIT),
            prepareFormData(settingsKey.BOOK_DUE_REMINDER_BEFORE_DAYS, book_due_reminder_before_days,
                settingsDisplayName.BOOK_DUE_REMINDER_BEFORE_DAYS)
        ];
        onSaveSettings(settings);
    };

    const onChangingLogo = (event) => {
        setLogoRef(logoFile);
        onLogoChange(event);
        setToggleFavicon(false);
        setToggleLogo(true);
        toggleModal();
    };

    const onChangingFavicon = (event) => {
        setFaviconRef(faviconFile);
        onFaviconChange(event);
        setToggleLogo(false);
        setToggleFavicon(true);
        toggleModal();
    };

    const onRemovingLogo = () => {
        onChangeAppLogo(null);
        onRemoveLogo();
    };

    const onRemovingFavicon = () => {
        onChangeAppFavicon(null);
        onRemoveFavicon();
    };

    const emitLogoChange = (fileRef) => {
        setLogoRef(fileRef);
    };

    const emitFaviconChange = (fileRef) => {
        setFaviconRef(fileRef);
    };

    const onSaveLogo = () => {
        if (isToggleFavicon) {
            onChangeAppFavicon(logoRef);
        } else {
            onChangeAppLogo(logoRef);
        }
        toggleModal();
    };

    const onSaveFavicon = () => {
        onChangeAppFavicon(faviconRef);
        toggleModal();
    };

    const onCancel = () => {
        toggleModal();
    };

    const logoPickerOptions = {
        image: initialValues.library_logo ? initialValues.library_logo : publicImagePath.APP_LOGO,
        isDefaultImage: isDefaultLogo,
        buttonName: 'image-picker.dropdown.logo.label',
        onRemovePhoto: onRemovingLogo,
        onFileChange: onChangingLogo,
        isRemoveOption: false,
        inputField: 'logo-picker'
    };

    const logoCropperOptions = {
        image: logo,
        emitFileChange: emitLogoChange,
        onSave: onSaveLogo,
        onCancel,
        isToggle: isToggleLogo
    };

    const faviconPickerOptions = {
        image: initialValues.library_favicon ? initialValues.library_favicon : publicImagePath.APP_LOGO,
        isDefaultImage: isDefaultFavicon,
        buttonName: 'image-picker.dropdown.favicon.label',
        onRemovePhoto: onRemovingFavicon,
        onFileChange: onChangingFavicon,
        isRemoveOption: false,
        inputField: 'favicon-picker',
        isFavicon: true
    };

    const faviconCropperOptions = {
        image: favicon,
        emitFileChange: emitFaviconChange,
        onSave: onSaveFavicon,
        onCancel,
        isToggle: isToggleFavicon,
        isFavicon: true
    };

    return (
        <Row className="settings">
            <Col xs={2} className="settings__logo">
                <h6 className="settings__logo-heading">{getFormattedMessage('image-picker.dropdown.logo.label')}</h6>
                <div>
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <ImageCropper {...logoCropperOptions}/>
                    <ImagePicker {...logoPickerOptions}/>
                </div>
                <h6 className="settings__favicon-heading mt-3">{getFormattedMessage('image-picker.dropdown.favicon.label')}</h6>
                <div>
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <ImageCropper {...faviconCropperOptions}/>
                    <ImagePicker {...faviconPickerOptions}/>
                </div>
            </Col>
            <Col xs={10} className="settings__form">
                <Row className="settings__form-columns">
                    <Col xs={6}>
                        <Field name='library_name' type="text" label="settings.input.app-name.label" required
                               groupText="list" component={InputGroup} inputRef={settingRef}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='currency' label="settings.select.currency.label" required groupText={groupText}
                               options={currencies} onChange={onSelectCurrency} isDefaultCurrency={true}
                               placeholder="settings.select.currency.placeholder" component={Select}
                               isSearchable={true}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='issue_due_days' type="number" label="settings.input.issue-due-days.label" min="0"
                               required groupText="calendar" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='return_due_days' type="number" label="settings.input.return-due-days.label" min="0"
                               required groupText="calendar" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='issue_books_limit' type="number" label="settings.input.max-issue-books-limit.label" min="0"
                               required groupText="calendar" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='reserve_books_limit' type="number" label="settings.input.max-reserve-books-limit.label" min="0"
                               required groupText="calendar" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='book_due_reminder_before_days' type="number"
                            label="settings.input.book-due-reminder-before-days.label" min="0"
                            required groupText="calendar" component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='penalty_per_day' type="number" label="settings.input.penalty.label" min="0"
                            isDefaultCurrency={true} required groupText={groupText} component={InputGroup}/>
                    </Col>
                    <Col xs={6}>
                        <Field name='language' label="settings.select.language.label" required groupText="language"
                            options={bookLanguagesOptions} placeholder="settings.select.language.placeholder"
                            component={Select} isSearchable={true}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={2} className="settings__favicon mt-2">
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} isHideCancel {...props}/>
            </Col>
        </Row>
    );
};

SettingsForm.propTypes = {
    initialValues: PropTypes.object,
    currencies: PropTypes.array,
    onSaveSettings: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    onChangeAppLogo: PropTypes.func,
    onChangeAppFavicon: PropTypes.func,
    toggleModal: PropTypes.func,
};

const form = reduxForm({
    form: 'settingsForm',
    validate: settingsFormValidate,
    enableReinitialize: true
})(SettingsForm);

export default connect(null, { toggleModal })(form);
