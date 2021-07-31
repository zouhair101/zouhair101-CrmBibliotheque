import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import './UserProfile.scss';
import {publicImagePathURL} from '../../../appConstant';
import userProfileValidate from '../../shared/userValidate';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import Select from "../../../shared/components/Select";
import {enableDisableUserInput, getFormattedMessage} from "../../../shared/sharedMethod";
import {imagePicker} from "../../../shared/custom-hooks";
import {maxDigits} from "../../constants";

const UserProfileForm = (props) => {
    const { initialValues, change, countries, history, onSaveProfile, handleSubmit } = props;
    const [isPasswordHidden, setPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
    const [image, isDefaultImage, file, onFileChange, onRemovePhoto] = imagePicker(change,
        !!initialValues.image_path ? initialValues.image_path : null, null,
        !(!!initialValues.image),
    );

    const onSave = (formValues) => {
        formValues.file = file;
        onSaveProfile(formValues);
    };

    const goToHomePage = () => {
        history.goBack();
    };

    const onclickPassword = (password) => {
        if (password) setPasswordHidden(!isPasswordHidden);
    };
    const onclickConfirmPassword = (password) => {
        if (password) setConfirmPasswordHidden(!isConfirmPasswordHidden);
    };

    const imagePickerOptions = {
        user: { name: initialValues ? initialValues.first_name + ' ' + initialValues.last_name : null },
        image,
        isDefaultImage,
        onRemovePhoto,
        onFileChange
    };

    return (
        <Row className="animated fadeIn user-form m-3">
            <Col xs={8} className="primary-detail">
                <div className="d-flex justify-content-between">
                    <h5>{getFormattedMessage('profile.primary-details')}</h5>
                </div>
                <hr className={'mt-0'}/>
                <Row>
                    <Col xs={12} sm={6}>
                        <Field name="first_name" label="profile.input.first-name.label" required
                               groupText="user-circle-o" component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="last_name" label="profile.input.last-name.label" required groupText="user"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="email" label="profile.input.email.label" readOnly required groupText="envelope"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="phone" type="number" label="profile.input.phone.label"
                               onChange={(e) => enableDisableUserInput(e, maxDigits.PHONE_NUMBER)} groupText="phone"
                               component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={4} className="user-profile">
                <h5 className="user-profile__title">{getFormattedMessage('profile.user-profile')}</h5>
                <hr className={'mt-0'}/>
                <div className="mt-5">
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <ImagePicker {...imagePickerOptions}/>
                </div>
            </Col>
            <Col xs={12} className="mt-2">
                <h5>{getFormattedMessage('profile.additional-details')}</h5>
                <hr/>
                <Row>
                    <Col xs={12} sm={6}>
                        <Field name="address_1" label="profile.input.address1.label" groupText="address-book"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="address_2" label="profile.input.address2.label" groupText="address-book-o"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="city" label="profile.input.city.label" groupText="circle" component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="state" label="profile.input.state.label" groupText="square"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="country" label="profile.select.country.label" options={countries}
                               placeholder="profile.select.country.placeholder" groupText="flag" component={Select}
                               isSearchable={true} isMini={true} menuPlacement="top"/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="zip" label="profile.input.zip.label" groupText="map-pin" component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} onCancel={goToHomePage} {...props}/>
            </Col>
        </Row>
    );
};

UserProfileForm.propTypes = {
    initialValues: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    countries: PropTypes.array,
    onSaveProfile: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
};

export default reduxForm({ form: 'userProfileForm', validate: userProfileValidate })(UserProfileForm);
