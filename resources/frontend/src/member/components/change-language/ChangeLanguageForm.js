import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import {languageOptions, settingsKey} from "../../constants";
import {getFormattedMessage,getFormattedOptions} from "../../../shared/sharedMethod";
import Select from "../../../shared/components/Select";

const ChangeLanguageForm = props => {
    const { onSaveChangeLanguage, handleSubmit, settings } = props;
    const inputRef = createRef();
    const bookLanguagesOptions = getFormattedOptions(languageOptions);

    const prepareFormData = (key, value, display_name) => {
        return { key, value, display_name };
    };

    const onSave = (formValues) => {
        const { language } = formValues;
        const settings = [
            prepareFormData(settingsKey.LANGUAGE, language.id, language.name)
        ];
        onSaveChangeLanguage(settings);
    }

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name='language' label='member.select.language.label' required groupText="language"
                    options={bookLanguagesOptions} placeholder="member.select.language.placeholder"
                    component={Select} isSearchable={true}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

export default reduxForm({ form: 'changeLanguageForm'})(ChangeLanguageForm);
