import React from 'react';
import {constants} from '../../constants';
import toastConfig from '../../config/toastConfig';
import {toast} from "react-toastify";
import ToastCard from '../../shared/toast/ToastCard';
import {toastType} from "../../member/constants";

const notify = (options, toastsConfig) => {
    toastsConfig.config.toastId = toastsConfig.id;
    toast(<ToastCard {...options}/>, toastsConfig.config);
};

export const addToast = (options = {}) => {
    const toastsConfig = toastConfig(options);
    notify(options, toastsConfig);
    return { type: constants.ADD_TOAST, payload: toastsConfig };
};

export const removeToast = (id) => {
    return { type: constants.REMOVE_TOAST, payload: id };
};

export const displayMessage = (message, success) => async (dispatch) => {
    success === 1 ? dispatch(addToast({text: message})) : dispatch(addToast({text: message, type: toastType.ERROR}));
};
