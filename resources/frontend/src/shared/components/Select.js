import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label
} from 'reactstrap';
import './Component.scss';
import {useIntl} from 'react-intl';

const ReactSelect = (props) => {
    const {
        input, placeholder, required, label, groupText, isSearchable = false,
        innerRef, defaultValue = {}, disabled, menuPlacement = "auto", isCustom,
        meta: { touched, error }, options, isMulti = false, isDefaultCurrency = false,
    } = props;
    const intl = new useIntl();
    const labelText = label ? intl.formatMessage({ id: label }) : null;
    const placeholderText = placeholder ? intl.formatMessage({ id: placeholder }) : null;
    const formGroupClass = isCustom ? 'react-select mb-0 mt-1' : 'react-select';
    const labelClass = required ? 'control-label' : '';
    const inputClass = isCustom ? 'react-select__input react-select__input--secondary' :
        'react-select__input react-select__input--primary';

    return (
        <FormGroup className={formGroupClass}>
            {label ? <Label className={labelClass}>{labelText}</Label> : null}
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        {isDefaultCurrency ? groupText : <i className={`fa fa-${groupText}`}/>}
                    </InputGroupText>
                </InputGroupAddon>
                <Select
                    {...input}
                    className={inputClass}
                    placeholder={placeholderText}
                    value={input.value}
                    isDisabled={disabled}
                    onChange={ (value) => input.onChange(value) }
                    onBlur={ (value) => input.onBlur() }
                    options={options}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    defaultValue={defaultValue}
                    isSearchable={isSearchable}
                    menuPlacement={menuPlacement}
                    ref={innerRef}
                    isClearable
                    isMulti={isMulti}/>
            </InputGroup>
            {touched && ((error && <FormFeedback className="d-block">{error}</FormFeedback>))}
        </FormGroup>
    )
};

ReactSelect.propTypes = {
    input: PropTypes.object,
    innerRef: PropTypes.object,
    defaultValue: PropTypes.object,
    meta: PropTypes.object,
    options: PropTypes.array,
    label: PropTypes.string,
    className: PropTypes.string,
    groupText: PropTypes.string,
    addOnType: PropTypes.string,
    placeholder: PropTypes.string,
    menuPlacement: PropTypes.string,
    isMulti: PropTypes.bool,
    disabled: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
    ]),
    required: PropTypes.bool,
    isSearchable: PropTypes.bool,
    isCustom: PropTypes.bool,
};

export default ReactSelect;
