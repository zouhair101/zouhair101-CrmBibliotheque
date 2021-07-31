import React, {createRef, useEffect, useState} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import genreValidate from './genreValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import TextArea from "../../../shared/components/TextArea";
import ToggleSwitch from '../../../shared/components/ToggleSwitch';
import {getFormattedMessage} from "../../../shared/sharedMethod";

const GenreForm = props => {
    const { initialValues, onSaveGenre, handleSubmit } = props;
    const [isFeatured, setIsFeatured] = useState(!!(initialValues && initialValues.is_featured));
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = formValues => {
        onSaveGenre(formValues);
    };

    const onChecked = () => {
        setIsFeatured(!isFeatured);
    };

    return (
        <Row className="animated fadeIn m-3">
            <div className="w-100">
                <div className="float-right px-3">
                    <Field name="show_on_landing_page" checked={isFeatured}
                        label={getFormattedMessage('books.toggle.is-featured.label')} onChange={onChecked}
                        component={ToggleSwitch}/>
                </div>
            </div>
            <Col xs={12}>
                <Field name="name" label="genres.input.name.label" required inputRef={inputRef} groupText="list-alt"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="description" label="genres.input.description.label" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

GenreForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveGenre: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'genreForm', validate: genreValidate })(GenreForm);
