import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeToast} from '../../store/action/toastAction';
import Toast from "./Toast";

const Toasts = props => {
    const { toasts, removeToast, language } = props;
    return (
        <div>
            {toasts.map(toast => {
                return (
                    <Toast {...toast} key={toast.id} language={language} onCancel={() => removeToast(toast.id)}/>
                );
            })}
        </div>
    );
};

Toasts.propTypes = {
    toasts: PropTypes.array,
    language: PropTypes.string,
    removeToast: PropTypes.func,
};

const mapStateToProps = state => {
    return { toasts: state.toasts }
};

export default connect(mapStateToProps, { removeToast })(Toasts);
