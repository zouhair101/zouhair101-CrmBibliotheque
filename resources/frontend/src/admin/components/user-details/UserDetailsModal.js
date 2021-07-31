import React from 'react';
import PropTypes from 'prop-types';
import EditUser from '../users/EditUser';
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const UserDetailsModal = (props) => {
    const { isEditMode, toggleModal, user } = props;

    const prepareModalOption = {
        className: 'user-modal',
        title: getFormattedMessage('users.edit-user-details.title'),
        toggleModal,
    };

    if (isEditMode) {
        return <EditUser {...prepareModalOption} user={user}/>
    }

    return null;
};

UserDetailsModal.propTypes = {
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
    toggleModal: PropTypes.func,
};

export default UserDetailsModal;
