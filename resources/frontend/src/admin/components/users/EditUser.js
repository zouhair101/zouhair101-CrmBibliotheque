import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import prepareFormData from '../../shared/prepareUserFormData';
import Modal from '../../../shared/components/Modal';
import {prepareProfileData} from "../../../shared/sharedMethod";
import {editUser} from '../../store/actions/userAction';

const EditUser = (props) => {
    const { user, editUser, toggleModal } = props;

    const onSaveUser = (formValues) => {
        editUser(user.id, prepareFormData(formValues));
    };

    const prepareFormOption = {
        onSaveUser,
        onCancel: toggleModal,
        initialValues: prepareProfileData(user),
    };

    return <Modal {...props} content={<UserForm {...prepareFormOption}/>}/>
};

EditUser.propTypes = {
    user: PropTypes.object,
    editUser: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editUser })(EditUser);
