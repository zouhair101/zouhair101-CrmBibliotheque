import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import './BookLanguages.scss';
import bookLanguageValidate from './bookLanguageValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';

const BookLanguageForm = props => {
    const { initialValues, onSaveBookLanguage, handleSubmit } = props;
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        formValues.language_code = formValues.language_code.toUpperCase();
        onSaveBookLanguage(formValues);
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="language_name" label="book-languages.input.name.label" required inputRef={inputRef}
                       groupText="language" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="language_code" className="code-field" readOnly={!!initialValues}
                       label="book-languages.input.code.label" required groupText="code" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

BookLanguageForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveBookLanguage: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'bookLanguageForm', validate: bookLanguageValidate })(BookLanguageForm);
