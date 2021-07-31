import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Toast.scss';
import {ToastContainer} from 'react-toastify';
import {settingsKey} from "../../appConstant";

const Toast = (props) => {
    const { onCancel, language } = props;

    useEffect(() => {
        setTimeout(() => onCancel(), 3000);
    }, []);

    return (
        <ToastContainer rtl={settingsKey.LOCALE_ARABIC === language || settingsKey.LOCALE_PERSIAN === language}/>
    );
};

Toast.propTypes = {
    language: PropTypes.string,
    onCancel: PropTypes.func,
};

export default Toast;
