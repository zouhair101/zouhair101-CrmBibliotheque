import React from 'react';
import PropTypes from 'prop-types';
import EditBookCirculation from '../books-circulation/EditBookCirculation';
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const BookCirculationDetailsModal = (props) => {
    const { bookHistory, isToggle, toggleModal } = props;
    if (isToggle) {
        const prepareModalOption = {
            toggleModal,
            className: 'book-history-detail__modal',
            title: getFormattedMessage('books-circulation.modal.edit.title'),
        };
        return <EditBookCirculation {...prepareModalOption} bookCirculation={bookHistory}/>
    }
    return null;
};

BookCirculationDetailsModal.propTypes = {
    bookHistory: PropTypes.object,
    isToggle: PropTypes.bool,
    toggleModal: PropTypes.func,
};

export default BookCirculationDetailsModal;
