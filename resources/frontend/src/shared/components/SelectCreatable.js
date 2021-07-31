import React from "react";
import CreatableSelect from "react-select/Creatable";
import PropTypes from 'prop-types';
import {
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label
} from 'reactstrap';
import { useIntl } from 'react-intl';
import './Component.scss';

const SelectCreatable = (props) => {
    const {
        input, placeholder, required, label, groupText, isSearchable = true,
        innerRef, disabled, menuPlacement = "auto", isCustom,
        meta: { touched, error, warning }, options, isMulti = false, isVisibleWarning = true
    } = props;
    const intl = new useIntl();
    const labelText = label ? intl.formatMessage({ id: label }) : null;
    const placeholderText = placeholder ? intl.formatMessage({ id: placeholder }) : null;
    const formGroupClass = isCustom ? 'react-select mb-0 mt-1' : 'react-select';
    const labelClass = required ? 'control-label' : '';
    const inputClass = isCustom ? 'react-select__input react-select__input--secondary' :
        'react-select__input react-select__input--primary';
    const addNewButton = intl.formatMessage({ id: 'global.select.add-new-btn.label' });
    const addNewOption = intl.formatMessage({ id: 'global.select.option.label' });

    const formatCreate = inputValue => {
        return ` ${ addNewButton } ${ label ? label : addNewOption }: ${ inputValue }`;
    };

    return (
        <FormGroup className={ formGroupClass }>
            { label ? <Label className={ labelClass }>{ labelText }</Label> : null }
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={ `fa fa-${ groupText }` }/>
                    </InputGroupText>
                </InputGroupAddon>
                <CreatableSelect
                    { ...input }
                    className={ inputClass }
                    placeholder={ placeholderText }
                    options={ options }
                    value={ input.value }
                    isDisabled={ disabled }
                    isClearable
                    isSearchable={ isSearchable }
                    menuPlacement={ menuPlacement }
                    ref={ innerRef }
                    isMulti={ isMulti }
                    formatCreateLabel={ (inputValue) => formatCreate(inputValue) }
                    onChange={ (value) => input.onChange(value) }
                    onBlur={ (value) => input.onBlur() }
                />
            </InputGroup>
            { touched && ((error && <FormFeedback className="d-block">{ error }</FormFeedback>)) }
            { ((!error && isVisibleWarning && warning &&
                <FormFeedback className="d-block text-success">{ warning }</FormFeedback>)) }
        </FormGroup>
    )
};

SelectCreatable.propTypes = {
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
    isVisibleWarning: PropTypes.bool
};

export default SelectCreatable;
