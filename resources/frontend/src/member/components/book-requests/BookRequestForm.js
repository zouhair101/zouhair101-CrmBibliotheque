import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import bookRequestValidate from './bookRequestValidate';
import {bookFormatOptions} from "../../../admin/constants";
import InputGroup from '../../../shared/components/InputGroup';
import Select from '../../../shared/components/Select';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import {getFormattedOptions} from "../../../shared/sharedMethod";

const BookRequestForm = props => {
    const { onSaveBookRequest, handleSubmit } = props;
    const inputRef = createRef();
    const bookFormats = getFormattedOptions(bookFormatOptions);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        const { book_name, isbn, edition, format } = formValues;
        onSaveBookRequest({ book_name, isbn, edition, format: format.id });
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="book_name" label="books.select.book.label" required inputRef={inputRef} groupText="book"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="isbn" label="book-request.input.isbn.label" required groupText="id-card"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="edition" label="book-request.input.edition.label" required groupText="file-text"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="format" label="book-request.select.format.label" required options={bookFormats}
                       placeholder="book-request.select.format.placeholder" groupText="wpforms" component={Select}/>
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
