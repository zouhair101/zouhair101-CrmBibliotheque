import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import {useIntl} from 'react-intl';
import './Component.scss';

const CustomInput = (props) => {
    const {
        input, label, type, min, max, required, groupText, isCustom, isDefaultCurrency = false,
        addOnType = 'prepend', placeholder, readOnly, meta: { touched, error }
    } = props;
    const intl = new useIntl();
    const formGroupClass = isCustom ? 'custom-input-search mb-0 mt-1' : '';
    const className = `${touched && error ? 'is-invalid' : ''}`;
    const labelClass = required ? 'control-label' : '';
    const placeholderText = placeholder ? intl.formatMessage({ id: placeholder }) : placeholder;

    return (
        <FormGroup className={formGroupClass}>
            <div className="controls">
                <Row>
                    <Col xs={6}>
                        {label ? <Label className={labelClass} style={{ marginTop: '16px' }}>{label}</Label> : null}
                    </Col>
                    <Col xs={label ? 6 : 12}>
                        <InputGroup>
                            <InputGroupAddon addonType={addOnType}>
                                <InputGroupText>
                                { isDefaultCurrency ? groupText : <i className={`fa fa-${groupText}`}/>}
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type={type} {...input} min={min} max={max} className={className}
                                   placeholder={placeholderText} readOnly={readOnly}/>
                            {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
                        </InputGroup>
                    </Col>
                </Row>
            </div>
        </FormGroup>
    );
};

CustomInput.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    groupText: PropTypes.string,
    addOnType: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    isCustom: PropTypes.bool
};

export default CustomInput;
