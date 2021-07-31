import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import Modal from '../../../shared/components/Modal';
import {deleteUser} from '../../store/actions/userAction';

const DeleteUser = (props) => {
    const { userId, deleteUser, toggleModal } = props;

    const onDeleteUser = () => {
        deleteUser(userId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteUser} onCancel={toggleModal}/>}/>
};

DeleteUser.propTypes = {
    userId: PropTypes.number,
    deleteUser: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteUser })(DeleteUser);
