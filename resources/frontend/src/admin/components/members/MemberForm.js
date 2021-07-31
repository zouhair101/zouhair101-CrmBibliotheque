import React, {useState, useEffect, createRef} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import './Members.scss';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import {maxDigits} from "../../constants";
import memberValidate from '../../shared/userValidate'
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import Select from "../../../shared/components/Select";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {enableDisableUserInput} from "../../../shared/sharedMethod";
import {imagePicker} from "../../../shared/custom-hooks";
import {fetchCountries} from "../../store/actions/countryAction";
import {fetchMembershipPlans} from "../../store/actions/membershipPlanAction";

const MemberForm = (props) => {
    const {
        initialValues, membershipPlans, countries, change,
        handleSubmit, onSaveMember, fetchCountries, fetchMembershipPlans, isEditMode
    } = props;

    const [isActive, setActive] = useState(initialValues.is_active);
    const [isPassword, setIsPassword] = useState(true);
    const [isConfirmPassword, setIsConfirmPassword] = useState(true);
    const inputRef = createRef();
    const [image, isDefaultImage, file, onFileChange, onRemovePhoto] = imagePicker(change,
        !!initialValues.image_path ? initialValues.image_path :
            !!initialValues.isCreate ? publicImagePath.USER_AVATAR : null,
        !!initialValues.isCreate ? publicImagePath.USER_AVATAR : null,
        !(!!initialValues.image_path),
    );

    useEffect(() => {
        fetchMembershipPlans();
        fetchCountries();
        inputRef.current.focus();
    }, []);

    const onSave = (formValues) => {
        formValues.file = file;
        onSaveMember(formValues);
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

    const onClickShowPassword = () => {
        setIsPassword(!isPassword);
    };

    const onClickShowConfirmPassword = () => {
        setIsConfirmPassword(!isConfirmPassword);
    };

    return (
        <Row className="animated fadeIn member-form m-none m-sm-3">
            <Col xs={8} className="primary-detail">
                <div className="d-flex justify-content-between">
                    <h5>{getFormattedMessage('profile.primary-details')}</h5>
                    <div className="d-flex">
                        <div>
                            <Field name="is_active" checked={isActive}
                                   label={getFormattedMessage('profile.toggle.is-active.label')}
                                   component={ToggleSwitch} onChange={onChecked}/>
                        </div>
                    </div>
                </div>
                <hr style={{ marginTop: '0px' }}/>
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
                        <Field name="email" label="profile.input.email.label" required groupText="envelope"
                               autoComplete={initialValues ? 'off' : 'new-email'} component={InputGroup}/>
                    </Col>
                    {initialValues.isCreate ?
                        <Col xs={12} sm={6}>
                            <Field name="password" label="profile.input.password.label" required
                                autoComplete={initialValues ? 'off' : 'new-password'} type={isPassword ? "password" : "text"}
                                groupText="lock" component={InputGroup} appendGroupText={isPassword ? "eye-slash" : "eye"}
                                isAppendIcon onClick={() => onClickShowPassword()}/>
                        </Col>
                    : null}
                    {initialValues.isCreate ?
                        <Col xs={12} sm={6}>
                            <Field name="confirm_password" label="profile.input.confirm-password.label" required
                                autoComplete={initialValues ? 'off' : 'new-password'} type={isConfirmPassword ? "password" : "text"}
                                groupText="lock" component={InputGroup} appendGroupText={isConfirmPassword ? "eye-slash" : "eye"}
                                isAppendIcon onClick={() => onClickShowConfirmPassword()}/>
                        </Col>
                    :null}
                    <Col xs={12} sm={6}>
                        <Field name="phone" type="number" label="profile.input.phone.label"
                               onChange={(e) => enableDisableUserInput(e, maxDigits.PHONE_NUMBER)} groupText="phone"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="membership_plan" label="members.select.plan.label" required
                               options={membershipPlans} placeholder="members.select.plan.placeholder" groupText="tasks"
                               component={Select} isSearchable={true} isMini={true}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={4} className="member-profile">
                <h5 className="member-profile__title">{getFormattedMessage('profile.member-profile')}</h5>
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
                               isSearchable={true} isMini={true}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field type="number" name="zip" label="profile.input.zip.label" groupText="map-pin" component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

MemberForm.propTypes = {
    initialValues: PropTypes.object,
    membershipPlans: PropTypes.array,
    countries: PropTypes.array,
    fetchCountries: PropTypes.func,
    fetchMembershipPlans: PropTypes.func,
    onSaveMember: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
};

const memberForm = reduxForm({ form: 'memberForm', validate: memberValidate })(MemberForm);
const mapStateToProps = (state) => {
    const { membershipPlans, countries } = state;
    return {
        membershipPlans: Object.values(membershipPlans), countries
    };
};

export default connect(mapStateToProps, { fetchCountries, fetchMembershipPlans })(memberForm);
