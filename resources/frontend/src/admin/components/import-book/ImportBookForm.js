import React from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import importBookValidate from '../../shared/bookValidate';
import importBookValidateWarning from '../../shared/bookValidateWarning';
import {publicImagePath} from '../../../appConstant';
import BookFormCard from "../../shared/componenents/book-form-card/BookFormCard";
import {prepareImportedBookObject} from "../../shared/prepareArray";
import {imagePicker} from "../../../shared/custom-hooks";
import {fetchImportBook} from "../../store/actions/importBookAction";
import {fetchSettings} from "../../store/actions/settingAction";

const ImportBookForm = (props) => {
    const {
        initialValues, change, currency, authors, tags, genres, handleSubmit,
        publishers, bookLanguages, onImportBook, fetchImportBook
    } = props;
    const [image, isDefaultImage, file, onFileChange, onRemovePhoto] = imagePicker(change,
        !!initialValues.image_url ? initialValues.image_url : publicImagePath.BOOK_AVATAR, publicImagePath.BOOK_AVATAR);

    const onSearchISBN = (isbn) => {
        fetchImportBook(isbn);
    };

    const onSaveBook = (formValues) => {
        formValues.file = file;
        onImportBook(formValues);
    };

    const imagePickerOptions = {
        image: !!initialValues.image_url ? initialValues.image_url : image,
        buttonName: 'image-picker.dropdown.cover.label',
        isDefaultImage: !!initialValues.image_url ? false : isDefaultImage,
        onRemovePhoto,
        onFileChange
    };
    const { invalid, onCancel, pristine } = props;
    const prepareFormOptions = {
        initialValues, change,
        currency, authors, tags, genres,
        publishers, bookLanguages,
        imagePickerOptions,
        onSaveBook,
        handleSubmit,
        saveActionOptions: { invalid, onCancel, pristine },
        onSearchISBN,
        isImportBook: true,
    };

    return (
        <BookFormCard {...prepareFormOptions}/>
    );
};

const prepareData = (book, ownProps) => {
    const { isbn, authors, publishers, genres, tags, languages, name, is_featured, image_url, published_on, description, url } = book
    let authorArray = [], genreArray = [], publisherArray = [], tagArray = [], languageArray = [];
    let itemArray = [];
    let newAuthors = [];
    if (authors && authors.length > 0) {
        authorArray = prepareImportedBookObject(authors);
        authorArray.forEach((author) => {
            const existAuthor = ownProps.authors.find(auth => +auth.value === +author.value);
            if (existAuthor) {
                author.label = existAuthor.label;
            } else {
                ownProps.authors.push(author);
                newAuthors.push(author);
            }
        });
    }
    if (genres && genres.length > 0) {
        genreArray = prepareImportedBookObject(genres);
    }
    if (publishers && publishers.length > 0) {
        publisherArray = prepareImportedBookObject(publishers);
    }
    if (tags && tags.length > 0) {
        tagArray = prepareImportedBookObject(tags);
    }
    // if (languages && languages.length > 0) {
    //     languageArray = prepareImportedBookObject(languages);
    // }
    // if (publisherArray.length > 0) {
    //     publisherArray.forEach(publisher => itemArray.push({ publisher }));
    // }
    // if (languageArray.length > 0) {
    //     languageArray.forEach(language => itemArray.push({ language }));
    // }
    // if (publisherArray.length > 0 && languageArray.length > 0) {
    //     itemArray = [];
    //     if (publisherArray.length > languageArray.length) {
    //         publisherArray.forEach((publisher, index) => itemArray.push({
    //             publisher,
    //             language: languageArray[index] ? languageArray[index] : null
    //         }));
    //     } else {
    //         languageArray.forEach((language, index) => itemArray.push({
    //             language,
    //             publisher: publisherArray[index] ? publisherArray[index] : null
    //         }));
    //     }
    // }
    itemArray = itemArray.length > 0 ? itemArray : [{}];
    return {
        items: [...itemArray], ...{
            isbn,
            name,
            authors: authorArray,
            new_authors: newAuthors,
            genres: genreArray,
            publishers: publisherArray,
            tags: tagArray,
            languages: languageArray,
            is_featured,
            published_on,
            image_url,
            description,
            url,
            file_name: !!image_url
        }
    }
};

ImportBookForm.propTypes = {
    initialValues: PropTypes.object,
    authors: PropTypes.array,
    genres: PropTypes.array,
    tags: PropTypes.array,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    currency: PropTypes.string,
    fetchImportBook: PropTypes.func,
    change: PropTypes.func,
    handleSubmit: PropTypes.func,
    onImportBook: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return { currency: state.currency, initialValues: prepareData(state.importBook, ownProps) };
};

const form = reduxForm({
    form: 'importBookForm',
    validate: importBookValidate,
    warn: importBookValidateWarning,
    enableReinitialize: true
})(ImportBookForm);

export default connect(mapStateToProps, { fetchSettings, fetchImportBook })(form);
