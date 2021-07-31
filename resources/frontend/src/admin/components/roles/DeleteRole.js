import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteRole} from '../../store/actions/roleAction';

const DeleteRole = (props) => {
    const { roleId, deleteRole, toggleModal } = props;

    const onDeleteRole = () => {
        deleteRole(roleId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteRole} onCancel={toggleModal}/>}/>
};

DeleteRole.propTypes = {
    roleId: PropTypes.number,
    deleteRole: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteRole })(DeleteRole);
