import React from 'react';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';

const TextArea = (props) => {
    const { input, label, required, rows, cols, meta: { touched, error } } = props;
    const intl = new useIntl();
    const className = `${touched && error ? 'form-control is-invalid' : 'form-control'}`;
    const labelClass = required ? 'control-label' : ' ';
    const labelText = label ? intl.formatMessage({ id: label }) : null;

    return (
        <div className="form-group">
            <label className={labelClass}>{labelText}</label>
            <textarea cols={cols} rows={rows} required={required} {...input} placeholder={labelText} className={className}
                      autoComplete="off"/>
            {touched && ((error && <span className="text-danger" style={{ fontSize: '80%' }}>{error}</span>))}
        </div>
    );
};

TextArea.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    rows: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    cols: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    label: PropTypes.string,
    required: PropTypes.bool,
};

export default TextArea;
