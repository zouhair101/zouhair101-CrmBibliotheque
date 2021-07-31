import React from 'react';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import bookValidate from '../../shared/bookValidate';
import bookValidateWarning from '../../shared/bookValidateWarning';
import './Books.scss';
import BookFormCard from "../../shared/componenents/book-form-card/BookFormCard";
import {publicImagePath} from '../../../appConstant';
import {imagePicker} from "../../../shared/custom-hooks";

const BookForm = (props) => {
    const {
        initialValues, change, currency, authors, tags, genres,
        publishers, bookLanguages, onSaveBook, initialize, handleSubmit,
    } = props;

    const [image, isDefaultImage, file, onFileChange, onRemovePhoto] = imagePicker(change,
        publicImagePath.BOOK_AVATAR, publicImagePath.BOOK_AVATAR);

    const onSave = (formValues) => {
        formValues.file = file;
        onSaveBook(formValues);
    };

    const imagePickerOptions = {
        image,
        buttonName: 'image-picker.dropdown.cover.label',
        isDefaultImage,
        onRemovePhoto,
        onFileChange
    };
    const { invalid, onCancel, pristine } = props;
    const prepareFormOptions = {
        initialValues, change, initialize,
        currency, authors, tags, genres,
        publishers, bookLanguages,
        imagePickerOptions,
        onSaveBook: onSave,
        saveActionOptions: { invalid, onCancel, pristine },
        handleSubmit
    };

    return (
        <BookFormCard {...prepareFormOptions}/>
    );
};

BookForm.propTypes = {
    initialValues: PropTypes.object,
    authors: PropTypes.array,
    genres: PropTypes.array,
    tags: PropTypes.array,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    currency: PropTypes.string,
    change: PropTypes.func,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
    onSaveBook: PropTypes.func
};

export default reduxForm({ form: 'bookForm', validate: bookValidate, warn: bookValidateWarning })(BookForm);
