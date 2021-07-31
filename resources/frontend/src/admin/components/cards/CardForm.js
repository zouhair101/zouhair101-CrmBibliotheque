import React, { createRef, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import cardValidate from './CardValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import TextArea from '../../../shared/components/TextArea';
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import { getFormattedMessage } from '../../../shared/sharedMethod';

const CardForm = props => {
    const { initialValues, onSaveCard, handleSubmit } = props;
    const [isActive, setIsActive] = useState(initialValues ? initialValues.is_active : true);
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        onSaveCard(formValues);
    };

    const onChecked = () => {
        setIsActive(!isActive);
    };

    return (
        <Row className='animated fadeIn m-3'>
            <div className='w-100'>
                <div className='float-right px-3'>
                    <Field name='is_active'
                           checked={ isActive }
                           label={ getFormattedMessage('about-us-card.toggle.is-active.label') }
                           onChange={ onChecked }
                           component={ ToggleSwitch }/>
                </div>
            </div>
            <Col xs={ 12 }>
                <Field name='title'
                       label='about-us-card.input.title.label'
                       required inputRef={ inputRef }
                       groupText='list-alt'
                       component={ InputGroup }/>
            </Col>
            <Col xs={ 12 }>
                <Field name='description'
                       label='about-us-card.input.description.label'
                       component={ TextArea }/>
            </Col>
            <Col xs={ 12 }>
                <SaveAction onSave={ handleSubmit(onSave) } { ...props }/>
            </Col>
        </Row>
    );
};

CardForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveCard: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'cardForm', validate: cardValidate })(CardForm);
