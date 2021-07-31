import React from 'react';
import PropTypes from 'prop-types';
import {
    FormGroup,
    InputGroup,
    Label,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import './Component.scss';

const ReactDatePicker = (props) => {
    const {
        label, required, placeholder, selected = '', addOnType = 'prepend',
        groupText = 'calendar-check-o', onChange, minDate = '', maxDate = '',
        dateFormat = 'MMMM d, yyyy', disabled = false, startOpen = false, shouldCloseOnSelect = true,
    } = props;
    const labelClass = required ? 'control-label' : '';

    return (
        <>
            <FormGroup>
                {label ? <Label className={labelClass}>{label}</Label> : null}
                <InputGroup className="date-picker-input">
                    <InputGroupAddon addonType={addOnType}>
                        <InputGroupText><i className={`fa fa-${groupText}`}/>
                        </InputGroupText>
                    </InputGroupAddon>
                    <DatePicker placeholderText={placeholder} selected={selected} onChange={onChange} maxDate={maxDate}
                                minDate={minDate} dateFormat={dateFormat} disabled={disabled}
                                shouldCloseOnSelect={shouldCloseOnSelect} startOpen={startOpen}/>
                </InputGroup>
            </FormGroup>
        </>
    )
};

ReactDatePicker.propTypes = {
    input: PropTypes.object,
    label: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    type: PropTypes.string,
    groupText: PropTypes.string,
    addOnType: PropTypes.string,
    placeholder: PropTypes.string,
    dateFormat: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    // minDate: PropTypes.oneOfType([
    //     PropTypes.func,
    //     PropTypes.date,
    // ]),
    // maxDate: PropTypes.oneOfType([
    //     PropTypes.func,
    //     PropTypes.date,
    // ]),
    // selected: PropTypes.oneOfType([
    //     PropTypes.func,
    //     PropTypes.date,
    // ]),
    onChange: PropTypes.func
};

export default ReactDatePicker;
