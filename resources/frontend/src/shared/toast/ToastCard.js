import React from 'react';
import PropTypes from 'prop-types';
import './Toast.scss';
import {toastType} from "../../admin/constants";
import {getFormattedMessage} from "../sharedMethod";

const ToastCard = (props) => {
    const { type, text, closeToast } = props;
    const iconColor = type === toastType.ERROR
        ? 'toast-card__icon--error' : 'toast-card__icon--success';

    const renderCard = () => {
        return (
            <div className="toast-card__alert">
                <div className={`toast-card__icon ${iconColor}`}>
                    <i className={`fas ${type === toastType.ERROR ? 'fa-times-circle' : 'fa-check-circle'} `}/>
                </div>
                <div>
                    <h5>
                        {getFormattedMessage(`${type === toastType.ERROR
                            ? 'toast.error.message' : 'toast.success.message'}`)}
                    </h5>
                    <span>{text}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="toast-card">
            <i className={`fa fa-times-circle fa-2x toast-card__close-btn ${iconColor}`} onClick={closeToast}/>
            {renderCard()}
        </div>
    )
};

ToastCard.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    type: PropTypes.string,
    closeToast: PropTypes.func,
};

export default ToastCard;
