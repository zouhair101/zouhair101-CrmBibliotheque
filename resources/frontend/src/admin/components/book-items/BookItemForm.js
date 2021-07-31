import React, {createRef, useEffect, useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Col, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import bookItemValidate from './bookItemValidate';
import '../book-details/BookDetails.scss';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import InputGroup from '../../../shared/components/InputGroup';
import Select from "../../../shared/components/Select";
import {enableDisableUserInput, getFormattedOptions} from "../../../shared/sharedMethod";
import {bookItemStatusOptions, bookFormatOptions, bookItemStatusConstants, maxDigits} from "../../constants";
import {prepareBookLanguage} from "../../shared/prepareArray";
import {fetchPublishers} from "../../store/actions/publisherAction";
import {fetchBookLanguages} from "../../store/actions/bookLanguageAction";
import InputFile from './inputFile';

const BookItemForm = (props) => {
    const {
        bookLanguages, publishers, onSaveBookItems, initialValues, currency, fetchBookLanguages,
        fetchPublishers, handleSubmit, newBookItem = false
    } = props;
    const [isDisabledStatus, setDisabledStatus] = useState(false);
    const inputRef = createRef();
    const bookItemsStatusOptions = getFormattedOptions(bookItemStatusOptions);
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);
    const [formateOptions, setFormatOptions] = useState(initialValues ? initialValues.format : null);

    useEffect(() => {
        fetchBookLanguages();
        fetchPublishers();
        prepareInitialValues();
    }, []);

    const prepareInitialValues = () => {
        if (!initialValues) {
            props.change('status', { ...bookItemsStatusOptions[0] });
        } else {
            if (initialValues.status && initialValues.status.id === bookItemStatusConstants.UNAVAILABLE) {
                setDisabledStatus(true);
            }
        }
        inputRef.current.focus();
    };

    const onSave = (formValues) => {
        const { book_code, edition, format, language, publisher, location, price, status, file } = formValues;

        {
            newBookItem ? onSaveBookItems({
                book_code,
                edition,
                format,
                language,
                publisher,
                status,
                location,
                price,
                file
            })
        :
            onSaveBookItems({
                book_code,
                edition,
                format: format.id,
                language_id: language.id,
                publisher_id: publisher ? publisher.id : null,
                status: status.id,
                location,
                price,
                file
            })
        }
    };

    const onChangeFormat = (options) => {
        setFormatOptions(options);
    }

    return (
        <Row className="animated fadeIn book-form m-3">
            <Col xs={12} sm={6}>
                <Field name="book_code" label="books.items.input.book-code.label" min="1" inputRef={inputRef} required
                       onChange={(e) => enableDisableUserInput(e, maxDigits.BOOK_CODE)} type="number"
                       groupText="file-text" component={InputGroup}/>
            </Col>
            <Col xs={12} sm={6}>
                <Field name="edition" label="books.items.input.edition.label" required groupText="file-text"
                       component={InputGroup}/>
            </Col>
            <Col xs={12} sm={6}>
                <Field name="format" label="books.items.select.format.label" required options={booksFormatOptions}
                       placeholder="books.items.select.format.placeholder" groupText="wpforms" component={Select} onChange={(options) => onChangeFormat(options)}/>
            </Col>
            {
                formateOptions && formateOptions.id === 3 ?
                <Col xs={12} sm={6}>
                    <Field name="file" type="file" component={InputFile} />
                </Col> :
                null
            }
            <Col xs={12} sm={6}>
                <Field name="location" label="books.items.input.location.label" groupText="map-pin"
                       component={InputGroup}/>
            </Col>
            {formateOptions && formateOptions.id !== 3 ?
                <Col xs={12} sm={6}>
                    <Field name="price" min="1" type="number" label="books.items.input.price.label"
                        groupText={currency} isDefaultCurrency={true} component={InputGroup}/>
                </Col> :
                null
            }
            <Col xs={12} sm={6}>
                <Field name="language" label="books.items.select.language.label" required options={bookLanguages}
                       placeholder="books.items.select.language.placeholder" groupText="language" component={Select}
                       isSearchable={true}/>
            </Col>
            <Col>
                <Field name="publisher" label="books.items.select.publisher.label" options={publishers}
                       placeholder="books.items.select.publisher.placeholder" groupText="user-circle-o"
                       component={Select} isSearchable={true}/>
            </Col>
            <Col xs={12} sm={6}>
                <Field name="status" label="books.items.select.status.label"
                       disabled={!initialValues || isDisabledStatus} options={bookItemsStatusOptions}
                       placeholder="books.items.select.status.placeholder" groupText="user-circle-o" component={Select}
                       isSearchable={true}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

BookItemForm.propTypes = {
    initialValues: PropTypes.object,
    currency: PropTypes.string,
    bookLanguages: PropTypes.array,
    publishers: PropTypes.array,
    fetchPublishers: PropTypes.func,
    fetchBookLanguages: PropTypes.func,
    handleSubmit: PropTypes.func,
    onSaveBookItems: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { publishers, bookLanguages } = state;
    return {
        bookLanguages: prepareBookLanguage(bookLanguages),
        publishers: Object.values(publishers),
    }
};
const bookItemForm = reduxForm({ form: 'bookItemForm', validate: bookItemValidate })(BookItemForm);
export default connect(mapStateToProps, { fetchPublishers, fetchBookLanguages })(bookItemForm);
