import React, {useEffect, useState, createRef} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm, FieldArray} from 'redux-form';
import PropTypes from 'prop-types';
import roleValidate from './roleValidate';
import InputGroup from '../../../shared/components/InputGroup';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import TextArea from "../../../shared/components/TextArea";
import CheckBox from "../../../shared/components/CheckBox";
import {getFormattedMessage} from "../../../shared/sharedMethod";

const RoleForm = props => {
    const { permissionsArray, handleSubmit, onSaveRole } = props;
    const [permissions] = useState(permissionsArray);
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
        prepareInitialValue();
    }, []);

    const prepareInitialValue = () => {
        if (props.initialValues) {
            const { name, display_name, description } = props.initialValues;
            props.initialize({ name, display_name, description, permissions: permissions })
        } else {
            props.initialize({ permissions: [...permissions] });
        }
    };

    const onSave = formValues => {
        formValues.permissionArray = formValues.permissions.filter(perm => perm.isChecked === true).map((({ id }) => id));
        onSaveRole(formValues);
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field name="name" label="roles.input.name.label" required inputRef={inputRef} groupText="list"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="display_name" label="roles.input.display-name.label" required groupText="list-alt"
                       component={InputGroup}/>
            </Col>
            <Col xs={12}>
                <Field name="description" label="roles.input.description.label" component={TextArea}/>
            </Col>
            <Col xs={12}>
                <h5>{getFormattedMessage('roles.permissions.title')}</h5>
                <hr/>
                <FieldArray name="permissions" component={renderPermissionsItems} permissions={permissions}/>
            </Col>
            <Col xs={12}>
                <hr/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
};

const renderPermissionsItems = ({ fields, meta: { error, submitFailed }, permissions }) => {
    const handleChanged = (index) => {
        permissions[index].selected = !permissions[index].selected;
    };

    return (
        <Row>
            {fields.map((item, index) => {
                    return (
                        <Col xs={12} sm={6} key={index}>
                            <Field name={`${item}.isChecked`} checked={permissions[index].selected}
                                   label={permissions[index].name} onChange={() => handleChanged(index)}
                                   component={CheckBox}/>
                        </Col>
                    )
                }
            )}
            {submitFailed && error && <div className="text-danger mt-3">{error}</div>}
        </Row>
    );
};

RoleForm.propTypes = {
    initialValues: PropTypes.object,
    permissionsArray: PropTypes.array,
    onSaveRole: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default  reduxForm({ form: 'roleForm', validate: roleValidate })(RoleForm);
