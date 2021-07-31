import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import bookRequestValidate from './bookRequestValidate';
import {bookCirculationStatusConstant, bookFormatOptions, bookRequestStatusOptions} from "../../../admin/constants";
import InputGroup from '../../../shared/components/InputGroup';
import Select from '../../../shared/components/Select';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import {getFormattedOptions} from "../../../shared/sharedMethod";
import {bookRequestStatus} from "../../constants";

const BookRequestForm = props => {
    const { onSaveBookRequest, handleSubmit, initialValues } = props;
    const inputRef = createRef();
    const bookFormats = getFormattedOptions(bookFormatOptions);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        const { status } = formValues;
        onSaveBookRequest(status.id);
    };

    // used for render a book request status options
    const renderBookStatusOption = () => {
        const booKRequestStatus = getFormattedOptions(bookRequestStatusOptions);
        switch (initialValues.status.id) {
            case bookRequestStatus.APPROVED:
                // remove pending af request approved
                return booKRequestStatus.filter(bookStatus => bookStatus.id !== bookRequestStatus.PENDING);
            case bookRequestStatus.AVAILABLE:
                // remove pending and approve option from dropdown af request approved and book available for use
                return booKRequestStatus.filter(bookStatus => bookStatus.id !== bookRequestStatus.PENDING
                    || bookStatus.id !== bookRequestStatus.APPROVED);
            case bookRequestStatus.CANCEL:
                return booKRequestStatus.filter(bookStatus => bookStatus.id === bookCirculationStatusConstant.CANCEL);
            default:
                return booKRequestStatus; // return all options
        }
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="book_name" label="books.table.book.column" required inputRef={inputRef} groupText="book"
                       component={InputGroup} readOnly/>
            </Col>
            <Col xs={12}>
                <Field name="isbn" label="book-request.input.isbn.label" required groupText="id-card"
                       component={InputGroup} readOnly/>
            </Col>
            <Col xs={12}>
                <Field name="edition" label="book-request.input.edition.label" required groupText="file-text"
                       component={InputGroup} readOnly/>
            </Col>
            <Col xs={12}>
                <Field name="format" label="book-request.select.format.label" required options={bookFormats}
                       placeholder="book-request.select.format.placeholder" groupText="wpforms" component={Select}
                       disabled={true}/>
            </Col>
            <Col xs={12}>
                <Field name="status" label="books-circulation.select.status.label" required
                       options={renderBookStatusOption()} groupText="info-circle"
                       placeholder="books-circulation.select.status.placeholder" component={Select}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

BookRequestForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveBookRequest: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'bookRequestForm', validate: bookRequestValidate })(BookRequestForm);
