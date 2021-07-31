import React from 'react';
import PropTypes from 'prop-types';
import CreateBookRequest from './CreateBookRequest';
import EditBookRequest from './EditBookRequest';
import DeleteBookRequest from './DeleteBookRequest';
import ModalConfig from '../../../shared/modal-config/ModalConfig';
import {getModalTitle} from "../../../shared/sharedMethod";

export const BookRequestModal = (props) => {
    const { bookRequest, isCreate, isEdit, isDelete } = props;
    const editConfig = { bookRequest };
    const delConfig = { bookRequestId: bookRequest ? bookRequest.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'book-request.input.new-btn.label',
            'book-request.modal.edit.title', 'book-request.modal.delete.title'),
        NewComponent: CreateBookRequest,
        EditComponent: EditBookRequest,
        DeleteComponent: DeleteBookRequest,
        deleteKey: bookRequest ? bookRequest.book_name : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

BookRequestModal.propTypes = {
    author: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default BookRequestModal;
