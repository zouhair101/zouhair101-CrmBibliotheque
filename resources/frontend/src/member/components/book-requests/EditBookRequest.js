import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookRequestForm from './BookRequestForm';
import Modal from '../../../shared/components/Modal';
import {editBookRequest} from '../../store/actions/bookRequestAction';
import {getFormattedOptions} from "../../../shared/sharedMethod";
import {bookFormatOptions} from "../../../admin/constants";

const EditBookRequest = (props) => {
    const { bookRequest, editBookRequest, toggleModal } = props;
    const bookFormats = getFormattedOptions(bookFormatOptions);

    const onSaveBookRequest = (formValues) => {
        editBookRequest(bookRequest.id, formValues);
    };

    const prepareFormOption = {
        onSaveBookRequest,
        onCancel: toggleModal,
        initialValues: {
            book_name: bookRequest.book_name,
            isbn: bookRequest.isbn,
            edition: bookRequest.edition,
            format: bookFormats.find(format => format.id === +bookRequest.format)
        }
    };

    return <Modal {...props} content={<BookRequestForm {...prepareFormOption} />}/>
};

EditBookRequest.propTypes = {
    bookRequest: PropTypes.object,
    editBookRequest: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editBookRequest })(EditBookRequest);
