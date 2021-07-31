import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, FormFeedback} from 'reactstrap';
import {useIntl} from "react-intl";

const CustomInputGroup = (props) => {
    const {
        input, type = "text", groupText,
        placeholder, meta: { touched, error }
    } = props;
    const intl = useIntl();
    const className = `${touched && error ? 'is-invalid' : ''}`;
    const placeholderText = placeholder ? intl.formatMessage({ id: placeholder }) : placeholder;

    return (
        <FormGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={groupText}/>
                    </InputGroupText>
                </InputGroupAddon>
                <Input type={type} {...input} placeholder={placeholderText} autoComplete="off" className={className}/>
                {touched && ((error && <FormFeedback>{error}</FormFeedback>))}
            </InputGroup>
        </FormGroup>
    );
};

CustomInputGroup.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    type: PropTypes.string,
    groupText: PropTypes.string,
    placeholder: PropTypes.string
};

export default CustomInputGroup;
