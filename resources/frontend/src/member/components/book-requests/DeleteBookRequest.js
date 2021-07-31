import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteBookRequest} from '../../store/actions/bookRequestAction';

const DeleteBookRequest = (props) => {
    const { bookRequestId, deleteBookRequest, toggleModal } = props;

    const onDeleteBookRequest = () => {
        deleteBookRequest(bookRequestId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookRequest} onCancel={toggleModal}/>}/>
};

DeleteBookRequest.propTypes = {
    bookRequestId: PropTypes.number,
    deleteBookRequest: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteBookRequest })(DeleteBookRequest);
