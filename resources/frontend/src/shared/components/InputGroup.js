import React from 'react';
import PropTypes from 'prop-types';
import {
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Input
} from 'reactstrap';
import './Component.scss';
import {useIntl} from 'react-intl';

const ReactInputGroup = (props) => {
    const {
        input, label, type = "text", min, max, required, readOnly, autoComplete = "off", onClick,
        inputRef, groupText, addOnType = 'prepend', placeholder, meta: { touched, error },
        isAppendIcon, appendGroupText, className, isDefaultCurrency = false
    } = props;
    const intl = new useIntl();
    const labelText = type !== 'hidden' ? intl.formatMessage({ id: label ? label : placeholder }) : label;
    const inputClass = `${touched && error ? `is-invalid ${className}` : className}`;
    const labelClass = required ? 'control-label' : '';
    const formClass = type === 'hidden' ? 'input-form-group' : '';
    const placeholderText = placeholder ? intl.formatMessage({ id: placeholder }) : labelText;

    return (
        <FormGroup className={formClass}>
            {type !== 'hidden' ? <Label className={labelClass}>{labelText}</Label> : null}
            <InputGroup>
                {type !== 'hidden' ?
                    <InputGroupAddon addonType={addOnType}>
                        <InputGroupText>
                            {isDefaultCurrency ? groupText : <i className={`fa fa-${groupText}`}/>}
                        </InputGroupText>
                    </InputGroupAddon>
                    : null
                }
                <Input type={type} {...input} min={min} max={max} readOnly={readOnly} innerRef={inputRef}
                       required={required} className={inputClass} placeholder={placeholderText}
                       autoComplete={autoComplete}/>
                {isAppendIcon ? <InputGroupText className="cursor-pointer" onClick={() => onClick(input.value)}>
                    <i className={`fa fa-${appendGroupText}`}/></InputGroupText> : null}
                {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
            </InputGroup>
        </FormGroup>
    );
};

ReactInputGroup.propTypes = {
    input: PropTypes.object,
    inputRef: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    autoComplete: PropTypes.string,
    className: PropTypes.string,
    groupText: PropTypes.string,
    appendGroupText: PropTypes.string,
    addOnType: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    isAppendIcon: PropTypes.bool,
    onClick: PropTypes.func
};

export default ReactInputGroup;
