import React, {createRef, useEffect} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import tagValidate from './tagValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';

const TagForm = props => {
    const { onSaveTag, handleSubmit } = props;
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        onSaveTag(formValues);
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="name" label="tags.input.name.label" required inputRef={inputRef} groupText="tag"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

TagForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveTag: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'tagForm', validate: tagValidate })(TagForm);
