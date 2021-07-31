import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap';
import './ActionButtons.scss';
import {getFormattedMessage} from "../sharedMethod";

const SaveAction = ({ onSave, onCancel, invalid, isHideCancel, pristine, isDisableSubmit = false, newBookItem }) => {
    return (
        <div className="save-action">
            {!isHideCancel ?
                <Button onClick={onCancel} color="secondary" className="save-action__cancel-btn" size="md">
                    {getFormattedMessage('global.input.cancel-btn.label')}
                </Button> : null
            }
            <Button onClick={onSave} disabled={invalid || pristine || isDisableSubmit} color="primary" size="md"
                    className="save-action__save-btn">
                {newBookItem ? getFormattedMessage('books.items.input.add-item-btn.label') : getFormattedMessage('global.input.save-btn.label')}
            </Button>
        </div>
    );
};

SaveAction.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

export default SaveAction;
