import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form';
import {Col, Row} from 'reactstrap';
import bookFormValidate from '../../shared/bookValidate';
import bookFormValidateWarning from '../../shared/bookValidateWarning';
import '../books/Books.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import TextArea from '../../../shared/components/TextArea';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import ImagePicker from '../../../shared/image-picker/ImagePicker';
import {publicImagePath, publicImagePathURL} from '../../../appConstant';
import SelectCreatable from "../../../shared/components/SelectCreatable";
import {getFormattedMessage, prepareFullNames} from "../../../shared/sharedMethod";
import {imagePicker, bookCreationWarning} from "../../../shared/custom-hooks";
import {prepareCreatableObject} from "../../shared/prepareArray";
import {fetchAuthors} from "../../store/actions/authorAction";
import {fetchTags} from "../../store/actions/tagAction";
import {fetchGenres} from "../../store/actions/genreAction";

const BookDetailsForm = (props) => {
    const {
        initialValues, change, authors, tags, genres, onSaveBook,
        handleSubmit, fetchAuthors, fetchGenres, fetchTags
    } = props;
    const [isFeatured, setIsFeatured] = useState(!!(initialValues && initialValues.is_featured));
    const [image, isDefaultImage, file, onFileChange, onRemovePhoto] = imagePicker(change,
        !!initialValues.image_path ? initialValues.image_path : publicImagePath.BOOK_AVATAR,
        publicImagePath.BOOK_AVATAR, !(!!initialValues.image)
    );
    const [onChangeAuthor] = bookCreationWarning(change);
    const [onChangeGenres] = bookCreationWarning(change);
    const [onChangeTags] = bookCreationWarning(change);

    useEffect(() => {
        fetchAuthors();
        fetchGenres();
        fetchTags();
    }, []);

    const onSave = (formValues) => {
        formValues.file = file;
        onSaveBook(formValues);
    };

    const onChecked = () => {
        setIsFeatured(!isFeatured);
    };

    const imagePickerOptions = {
        image: initialValues.image_path ? initialValues.image_path : image,
        buttonName: 'image-picker.dropdown.cover.label',
        isDefaultImage,
        onRemovePhoto,
        onFileChange
    };

    return (
        <Row className="animated fadeIn book-detail-form-card m-3">
            <Col xs={8} className="book-detail-form-card__primary-details">
                <div className="d-flex justify-content-between">
                    <h5>{getFormattedMessage('books.form.primary-details')}</h5>
                    <div className="d-flex">
                        <div>
                            <Field name="is_featured" checked={isFeatured}
                                   label={getFormattedMessage('books.toggle.is-featured.label')} onChange={onChecked}
                                   component={ToggleSwitch}/>
                        </div>
                    </div>
                </div>
                <hr className="book-detail-form-card__hr"/>
                <Row>
                    <Col xs={12}>
                        <Field name="name" label="books.input.name.label" required groupText="book"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="authors" label="authors.title" required isMulti={true}
                               onChange={(options) => onChangeAuthor(options, authors, 'new_authors')} options={authors}
                               placeholder="books.select.authors.placeholder" groupText="user-circle-o"
                               component={SelectCreatable}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="isbn" label="books.input.isbn.label" required groupText="id-card"
                               component={InputGroup}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="genres" label="genres.title" required isMulti={true}
                               onChange={(options) => onChangeGenres(options, genres, 'new_genres')} options={genres}
                               placeholder="books.select.genres.placeholder" groupText="list-alt"
                               component={SelectCreatable}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="tags" label="tags.title" isMulti={true}
                               onChange={(options) => onChangeTags(options, tags, 'new_tags')} options={tags}
                               placeholder="books.select.tags.placeholder" groupText="tag" component={SelectCreatable}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="url" label="books.input.url.label" groupText="link" component={InputGroup}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={4} className="book-detail-form-card__book-cover">
                <h5>{getFormattedMessage('books.book-cover.title')}</h5>
                <hr/>
                <div className="mt-5">
                    <Field name="file_name" type="hidden" component={InputGroup}/>
                    <ImagePicker {...imagePickerOptions}/>
                </div>
            </Col>
            <Col xs={12} className="mt-2">
                <Row>
                    <Col xs={12}>
                        <Field name="description" cols={90} rows={3} label="books.input.description.label"
                               component={TextArea}/>
                    </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};


BookDetailsForm.propTypes = {
    initialValues: PropTypes.object,
    authors: PropTypes.array,
    genres: PropTypes.array,
    tags: PropTypes.array,
    change: PropTypes.func,
    handleSubmit: PropTypes.func,
    onSaveBook: PropTypes.func,
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

const bookDetailsForm = reduxForm({
    form: 'bookForm',
    validate: bookFormValidate,
    warn: bookFormValidateWarning
})(BookDetailsForm);

export default connect(mapStateToProps, { fetchAuthors, fetchGenres, fetchTags })(bookDetailsForm);
