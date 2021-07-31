import React from 'react';
import PropTypes from 'prop-types';
import CreateRole from './CreateRole';
import EditRole from './EditRole';
import DeleteRole from './DeleteRole';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

export const RoleModal = (props) => {
    const { role, isCreate, isEdit, isDelete } = props;
    const editConfig = { role };
    const delConfig = { roleId: role ? role.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'roles.input.new-btn.label',
            'roles.modal.edit.title', 'roles.modal.delete.title'),
        NewComponent: CreateRole,
        EditComponent: EditRole,
        DeleteComponent: DeleteRole,
        deleteKey: role ? role.name : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

RoleModal.propTypes = {
    role: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default RoleModal;
