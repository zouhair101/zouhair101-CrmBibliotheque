import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookForm from './BookDetailsForm';
import '../books/Books.scss';
import prepareFormData from '../../shared/prepareBookFormData';
import Modal from '../../../shared/components/Modal';
import {prepareFullNames} from "../../../shared/sharedMethod";
import {prepareCreatableObject} from "../../shared/prepareArray";
import {editBook} from '../../store/actions/bookAction';

const EditBookDetails = (props) => {
    const { book, editBook, modalConfig, } = props;
    const { id, is_featured, isbn, name, price, url, description, image, image_path } = book;

    const onSaveBook = (formValues) => {
        editBook(id, prepareFormData(formValues));
    };

    const changAbleFields = {
        id,
        is_featured,
        isbn,
        genres: prepareCreatableObject(book.genres),
        authors: prepareCreatableObject(prepareFullNames(book.authors)),
        name,
        price,
        tags: prepareCreatableObject(book.tags),
        url,
        description,
        image,
        image_path,
        file_name: !!image
    };

    const prepareFormOption = {
        onSaveBook,
        initialValues: changAbleFields,
        onCancel: modalConfig.toggleModal,
    };

    return (
        <Modal {...modalConfig} content={<BookForm {...prepareFormOption}/>}/>
    );
};

EditBookDetails.propTypes = {
    book: PropTypes.object,
    modalConfig: PropTypes.object,
    editBook: PropTypes.func,
    fetchAuthors: PropTypes.func,
    fetchGenres: PropTypes.func,
    fetchTags: PropTypes.func
};

const mapStateToProps = (state) => {
    const { authors, tags, genres } = state;
    return {
        authors: prepareCreatableObject(prepareFullNames(authors)),
        tags: prepareCreatableObject(tags),
        genres: prepareCreatableObject(genres)
    }
};

export default connect(mapStateToProps, { editBook })(EditBookDetails);
