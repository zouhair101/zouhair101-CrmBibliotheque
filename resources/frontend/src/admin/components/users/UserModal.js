import React from 'react';
import PropTypes from 'prop-types';
import CreateUser from './CreateUser';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

export const UserModal = (props) => {
    const { user, isCreate, isEdit, isDelete } = props;
    const editConfig = { user };
    const delConfig = { userId: user ? user.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'users.modal.add.title',
            'users.modal.edit.title', 'users.modal.delete.title'),
        NewComponent: CreateUser,
        EditComponent: EditUser,
        DeleteComponent: DeleteUser,
        deleteKey: user ? user.first_name + ' ' + user.last_name : null,
        editConfig,
        delConfig,
        isWide: true,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

UserModal.propTypes = {
    user: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default UserModal;
