import React from 'react';
import PropTypes from 'prop-types';
import './Component.scss';

const Radio = (props) => {
    const { input, label, checked = false, disabled = false } = props;

    return (
        <>
            <input type="radio" name="radio" className="form__radio" checked={checked} {...input} disabled={disabled}/>
            <label className="form__label">{label}</label>
        </>
    );
};

Radio.propTypes = {
    input: PropTypes.object,
    label: PropTypes.object,
    checked: PropTypes.bool,
    disabled: PropTypes.bool
};

export default Radio;
