import React from 'react';
import PropTypes from 'prop-types';
import EditBookDetails from './EditBookDetails';
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const BookDetailsModal = (props) => {
    const { book, isToggle, toggleModal } = props;
    if (isToggle) {
        const prepareModalOption = {
            book,
            modalConfig: {
                className: 'book-detail__modal',
                title: getFormattedMessage('books.edit-book-details.title'),
                toggleModal
            }
        };
        return <EditBookDetails {...prepareModalOption}/>
    }
    return null;
};

BookDetailsModal.propTypes = {
    book: PropTypes.object,
    isToggle: PropTypes.bool,
    toggleModal: PropTypes.func,
};

export default BookDetailsModal;
