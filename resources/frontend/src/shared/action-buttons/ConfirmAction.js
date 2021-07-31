import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {getFormattedMessage} from "../sharedMethod";

const ConfirmAction = (props) => {
    const { onConfirm, onCancel } = props;

    return (
        <>
            <Button color="success" onClick={onConfirm}>
                {getFormattedMessage('global.input.yes-btn.label')}
            </Button>
            <Button color="secondary" onClick={onCancel}>
                {getFormattedMessage('global.input.no-btn.label')}
            </Button>
        </>
    );
};

ConfirmAction.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default ConfirmAction;
