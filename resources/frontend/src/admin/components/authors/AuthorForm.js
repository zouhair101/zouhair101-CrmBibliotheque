import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import authorValidate from './authorValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import TextArea from '../../../shared/components/TextArea';

const AuthorForm = props => {
    const { onSaveAuthor, handleSubmit } = props;
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        onSaveAuthor(formValues);
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="first_name" label="profile.input.first-name.label" required inputRef={inputRef}
                       groupText="user-circle-o" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="last_name" label="profile.input.last-name.label" groupText="user" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="description" label="authors.input.description.label" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

AuthorForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveAuthor: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'authorForm', validate: authorValidate })(AuthorForm);
