import React, {useState, useEffect, createRef} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import './Users.scss';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {maxDigits} from "../../constants";
import userValidate from '../../shared/userValidate';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import Select from "../../../shared/components/Select";
import {getCurrentUser} from "../../shared/sharedMethod";
import {prepareRoles} from "../../shared/prepareArray";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {enableDisableUserInput} from "../../../shared/sharedMethod";
import {imagePicker} from "../../../shared/custom-hooks";
import {fetchRoles} from "../../store/actions/roleAction";
import {fetchCountries} from "../../store/actions/countryAction";
import {editUser} from "../../store/actions/userAction";

const UserForm = (props) => {
    const { initialValues, change, roles, countries, fetchCountries, fetchRoles, onSaveUser, handleSubmit } = props;
    const [isActive, setActive] = useState(initialValues.is_active);
    const [isPassword, setIsPassword] = useState(true);
    const [isConfirmPassword, setIsConfirmPassword] = useState(true);
    const inputRef = createRef();
    const [image, isDefaultImage, file, onFileChange, onRemovePhoto] = imagePicker(change,
        initialValues.image_path ? initialValues.image_path : null,
        !!initialValues.isCreate ? publicImagePath.USER_AVATAR : null,
        !(!!initialValues.image_path),
    );

    useEffect(() => {
        fetchCountries();
        fetchRoles();
        inputRef.current.focus();
    }, []);

    const onSave = (formValues) => {
        formValues.file = file;
        onSaveUser(formValues);
    };

    const onChecked = () => {
        setActive(!isActive);
    };

    const imagePickerOptions = {
        user: { name: initialValues ? initialValues.first_name + ' ' + initialValues.last_name : null },
        image,
        isDefaultImage,
        onRemovePhoto,
        onFileChange
    };
    const isVisibleSwitch = initialValues && initialValues.id !== getCurrentUser().id || !initialValues;

    const onClickShowPassword = () => {
        setIsPassword(!isPassword);
    };

    const onClickShowConfirmPassword = () => {
        setIsConfirmPassword(!isConfirmPassword);
    };

    return (
        <Row className="animated fadeIn user-form m-3">
            <Col xs={8} className="primary-detail">
                <div className="d-flex justify-content-between">
                    <h5>{getFormattedMessage('profile.primary-details')}</h5>
                    {isVisibleSwitch ?
                        <div className="d-flex">
                            <div>
                                <Field name="is_active" checked={isActive}
                                       label={getFormattedMessage('profile.toggle.is-active.label')}
                                       component={ToggleSwitch} onChange={onChecked}/>
                            </div>
                        </div> : null
                    }
                </div>
                <hr className={isVisibleSwitch ? 'user-form__divider--mt-0' : 'user-form__divider--mt-10'}/>
                <Row>
                    <Col xs={12} sm={6}>
                        <Field name="first_name" label="profile.input.first-name.label" required inputRef={inputRef}
                               groupText="user-circle-o" component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="last_name" label="profile.input.last-name.label" required groupText="user"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="email" label="profile.input.email.label"
                               autoComplete={initialValues ? 'off' : 'new-email'} required groupText="envelope"
                               component={InputGroup}/>
                    </Col>
                    {initialValues.isCreate ?
                        <Col xs={12} sm={6}>
                            <Field name="password" label="profile.input.password.label" required
                                autoComplete={initialValues ? 'off' : 'new-password'} type={isPassword ? "password" : "text"} groupText="lock"
                                component={InputGroup} appendGroupText={isPassword ? "eye-slash" : "eye"}
                                isAppendIcon onClick={() => onClickShowPassword()}/>
                        </Col>
                    :null}
                    {initialValues.isCreate ?
                        <Col xs={12} sm={6}>
                            <Field name="confirm_password" label="profile.input.confirm-password.label" required
                            autoComplete={initialValues ? 'off' : 'new-password'} type={isConfirmPassword ? "password" : "text"} groupText="lock"
                            component={InputGroup} appendGroupText={isConfirmPassword ? "eye-slash" : "eye"}
                            isAppendIcon onClick={() => onClickShowConfirmPassword()}/>
                        </Col>
                    :null}
                    <Col xs={12} sm={6}>
                        <Field name="phone" type="number" label="profile.input.phone.label"
                               onChange={(e) => enableDisableUserInput(e, maxDigits.PHONE_NUMBER)} groupText="phone"
                               component={InputGroup}/>
                    </Col>

                    <Col xs={12} sm={6}>
                        <Field name="role" label="users.select.role.label" required options={roles}
                               placeholder="users.select.role.placeholder" groupText="tasks" component={Select}
                               isSearchable={true} isMini={true}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={4} className="user-profile">
                <h5 className="user-profile__title">{getFormattedMessage('profile.user-profile')}</h5>
                <hr/>
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
                               isSearchable={true}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="zip" type="number" label="profile.input.zip.label" groupText="map-pin" component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

UserForm.propTypes = {
    initialValues: PropTypes.object,
    roles: PropTypes.array,
    countries: PropTypes.array,
    fetchCountries: PropTypes.func,
    fetchRoles: PropTypes.func,
    onSaveUser: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { roles, countries } = state;
    return { roles: prepareRoles(Object.values(roles)), countries }
};
const userForm = reduxForm({ form: 'userForm', validate: userValidate })(UserForm);
export default connect(mapStateToProps, { editUser, fetchCountries, fetchRoles })(userForm);
