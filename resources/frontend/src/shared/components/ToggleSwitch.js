import React from 'react';
import PropTypes from 'prop-types';
import './Component.scss';

const ToggleSwitch = (props) => {
    const { input, label, checked = false } = props;

    return (
        <>
            {label ? <span className="toggle-label">{label}</span> : null}
            <label className="switch switch-label switch-primary">
                <input type="checkbox" className="switch-input" checked={checked} {...input}/>
                <span className="switch-slider" data-checked="&#x2713;" data-unchecked="&#x2715;"/>
            </label>
        </>
    );
};

ToggleSwitch.propTypes = {
    input: PropTypes.object,
    label: PropTypes.object,
    checked: PropTypes.bool,
};

export default ToggleSwitch;
