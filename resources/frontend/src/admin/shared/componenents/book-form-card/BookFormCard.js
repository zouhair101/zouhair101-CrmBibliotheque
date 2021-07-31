import React, {useState, useEffect, createRef} from 'react';
import {Field, FieldArray} from 'redux-form';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import './BookFormCard.scss';
import SaveAction from '../../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../../shared/components/InputGroup';
import TextArea from '../../../../shared/components/TextArea';
import ToggleSwitch from '../../../../shared/components/ToggleSwitch';
import ImagePicker from '../../../../shared/image-picker/ImagePicker';
import SelectCreatable from "../../../../shared/components/SelectCreatable";
import BookItemsCard from "../../../shared/componenents/book-items-card/BookItemsCard";
import {getFormattedMessage} from "../../../../shared/sharedMethod";
import {bookCreationWarning} from "../../../../shared/custom-hooks";

const BookFormCard = (props) => {
    const {
        initialValues, change, currency, authors, tags, genres,
        publishers, bookLanguages, onSaveBook, handleSubmit, initialize, isImportBook, onSearchISBN,
        imagePickerOptions, saveActionOptions
    } = props;
    const [isFeatured, setIsFeatured] = useState(!!(initialValues && initialValues.is_featured));
    const inputRef = createRef();
    const [onChangeAuthor] = bookCreationWarning(change);
    const [onChangeGenres] = bookCreationWarning(change);
    const [onChangeTags] = bookCreationWarning(change);

    useEffect(() => {
        inputRef.current.focus();
        initialize ? initialize({ items: [] }) : null;
    }, []);

    const onFocusChangeISBN = (event) => {
        if (event.target.value) {
            onSearchISBN(event.target.value);
        }
    };

    const onSave = (formValues) => {
        if (isImportBook) {
            formValues['items'] = formValues['items'].slice(1);
        }
        onSaveBook(formValues);
    };

    const onChecked = () => {
        setIsFeatured(!isFeatured);
    };

    return (
        <Row className="animated fadeIn book-form-card m-none m-sm-3">
            <Col xs={8} className="book-form-card__primary-details">
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
                <hr className="book-form-card__hr"/>
                <Row>
                    {isImportBook ?
                        <Col xs={12} sm={6}>
                            <Field name="isbn" label="books.input.isbn.label"
                                   placeholder="books.input.search-isbn.placeholder" required inputRef={inputRef}
                                   onBlur={(e) => onFocusChangeISBN(e)} groupText="id-card"
                                   onClick={() => onFocusChangeISBN} appendGroupText="search" isAppendIcon
                                   component={InputGroup}/>
                        </Col> :
                        <Col xs={12} sm={6}>
                            <Field name="isbn" label="books.input.isbn.label" required inputRef={inputRef}
                                   groupText="id-card" component={InputGroup}/>
                        </Col>
                    }
                    <Col xs={12} sm={6}>
                        <Field name="authors" label="authors.title" required isMulti={true}
                               onChange={(options) => onChangeAuthor(options, authors, 'new_authors')} options={authors}
                               placeholder="books.select.authors.placeholder" groupText="user-circle-o"
                               component={SelectCreatable}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="genres" label="genres.title" required isMulti={true}
                               onChange={(options) => onChangeGenres(options, genres, 'new_genres')} options={genres}
                               placeholder="books.select.genres.placeholder" groupText="list-alt"
                               component={SelectCreatable}/>
                    </Col>
                    <Col xs={12} sm={6}>
                        <Field name="name" label="books.input.name.label" required groupText="book"
                               component={InputGroup}/>
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
            <Col xs={4} className="book-form-card__book-cover">
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
            <Col xs={12} className="mt-3">
                <h5>{getFormattedMessage('books.items.title')}</h5>
                <FieldArray name="items" component={BookItemsCard} bookLanguages={bookLanguages} publishers={publishers}
                            currency={currency} change={change}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...saveActionOptions}/>
            </Col>
        </Row>
    );
};

BookFormCard.propTypes = {
    initialValues: PropTypes.object,
    imagePickerOptions: PropTypes.object,
    saveActionOptions: PropTypes.object,
    authors: PropTypes.array,
    genres: PropTypes.array,
    tags: PropTypes.array,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    currency: PropTypes.string,
    isImportBook: PropTypes.bool,
    change: PropTypes.func,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
    onSaveBook: PropTypes.func,
    onSearchISBN: PropTypes.func,
};

export default BookFormCard;
