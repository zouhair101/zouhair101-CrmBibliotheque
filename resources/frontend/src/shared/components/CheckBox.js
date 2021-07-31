import React from 'react';
import PropTypes from 'prop-types';
import './Component.scss';

const CheckBox = (props) => {
    const { input, label } = props;

    return (
        <label className="control control--checkbox">{label}
            <input type="checkbox" checked={!!input.value}
                   onChange={(e, { checked }) => input.onChange(checked)} {...input}/>
            <div className="control__indicator"/>
        </label>
    );
};

CheckBox.propTypes = {
    input: PropTypes.object,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ])
};

export default CheckBox;
