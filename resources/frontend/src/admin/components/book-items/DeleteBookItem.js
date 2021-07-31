import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import {deleteBookItem} from '../../store/actions/bookItemAction';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';

const DeleteBookItem = (props) => {
    const { bookItemId, deleteBookItem, toggleModal } = props;

    const onDeleteBookItem = () => {
        deleteBookItem(bookItemId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookItem} onCancel={toggleModal}/>}/>
};

DeleteBookItem.propTypes = {
    bookItemId: PropTypes.number,
    deleteBookItem: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteBookItem })(DeleteBookItem);
