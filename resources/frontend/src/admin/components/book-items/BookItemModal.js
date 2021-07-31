import React from 'react';
import PropTypes from 'prop-types';
import CreateBookItem from './CreateBookItem';
import EditBookItem from './EditBookItem';
import DeleteBookItem from './DeleteBookItem';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

export const BookItemModal = (props) => {
    const { bookItem, bookItems, bookId, currency, isCreate, isEdit, isDelete } = props;
    const addConfig = { bookId, bookItems, currency };
    const editConfig = { bookId, bookItems, bookItem, currency };
    const delConfig = { bookItemId: bookItem ? bookItem.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'books.items.input.new-btn.label',
            'books.items.modal.edit.title', 'books.items.modal.delete.title'),
        NewComponent: CreateBookItem,
        EditComponent: EditBookItem,
        DeleteComponent: DeleteBookItem,
        deleteKey: bookItem ? bookItem.edition + '(' + bookItem.book_code + ')' : null,
        addConfig,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

BookItemModal.propTypes = {
    bookItem: PropTypes.object,
    bookItems: PropTypes.array,
    bookId: PropTypes.number,
    currency: PropTypes.string,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default BookItemModal;
