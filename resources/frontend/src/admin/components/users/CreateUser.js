import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import prepareFormData from '../../shared/prepareUserFormData';
import Modal from '../../../shared/components/Modal';
import {addUser} from '../../store/actions/userAction';
import {Filters} from "../../../constants";

const CreateUser = (props) => {
    const { addUser, toggleModal } = props;

    const onSaveUser = (formValues) => {
        addUser(prepareFormData(formValues), Filters.OBJ);
    };

    const prepareFormOption = {
        initialValues: { is_active: true, isCreate: true },
        onSaveUser,
        onCancel: toggleModal,
    };

    return <Modal {...props} content={<UserForm{...prepareFormOption}/>}/>
};

CreateUser.propTypes = {
    addUser: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addUser })(CreateUser);
