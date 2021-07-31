import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import publisherValidate from './publisherValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';

const PublisherForm = props => {
    const { onSavePublisher, handleSubmit } = props;
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        onSavePublisher(formValues);
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="name" label="publishers.input.name.label" required inputRef={inputRef}
                       groupText="user-circle-o" component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

PublisherForm.propTypes = {
    initialValues: PropTypes.object,
    onSavePublisher: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'publisherForm', validate: publisherValidate })(PublisherForm);
