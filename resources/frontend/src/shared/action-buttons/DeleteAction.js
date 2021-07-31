import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import {getFormattedMessage} from "../sharedMethod";

const DeleteAction = (props) => {
    const { onDelete, onCancel } = props;

    return (
        <Fragment>
            <Button color="danger" onClick={onDelete}>
                {getFormattedMessage('global.input.yes-btn.label')}
            </Button>
            <Button color="secondary" onClick={onCancel}>
                {getFormattedMessage('global.input.cancel-btn.label')}
            </Button>
        </Fragment>
    );
};

DeleteAction.propTypes = {
    onDelete: PropTypes.func,
    onCancel: PropTypes.func,
};

export default DeleteAction;
