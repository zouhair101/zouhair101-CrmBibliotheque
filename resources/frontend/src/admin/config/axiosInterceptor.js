import {errorMessage} from '../../appConstant';
import {environment} from '../../environment';
import {LocalStorageKey, loggedConstant, Routes, Tokens} from "../../constants";

export default {
    setupInterceptors: (axios, isToken = false, isFormData = false) => {
        axios.interceptors.request.use(config => {
                if (isToken) {
                    return config;
                }
                let token = localStorage.getItem(Tokens.ADMIN);
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                if (!token) {
                    if (!window.location.href.includes('login') && !window.location.href.includes('reset-password')) {
                        window.location.href = environment.URL + '/#' + Routes.ADMIN_LOGIN;
                    }
                }
                if (isFormData) {
                    config.headers['Content-Type'] = 'multipart/form-data';
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        axios.interceptors.response.use(
            response => successHandler(response),
            error => errorHandler(error)
        );
        const errorHandler = (error) => {

            if(error.response.status === 401) {
                window.location.href = environment.URL + '/#' + Routes.ADMIN_LOGIN;
                localStorage.removeItem(Tokens.ADMIN);
                localStorage.removeItem(LocalStorageKey.USER);
            }

            if (error.response.data.message === errorMessage.TOKEN_NOT_PROVIDED
                || error.response.data.message === errorMessage.TOKEN_INVALID
                || error.response.data.message === errorMessage.TOKEN_INVALID_SIGNATURE
                || error.response.data.message === errorMessage.TOKEN_EXPIRED
                || error.response.data.message === errorMessage.MEMBER_OR_USER_DEACTIVATE
            ) {
                window.location.href = environment.URL + '/#' + Routes.ADMIN_LOGIN;
                localStorage.removeItem(Tokens.ADMIN);
                localStorage.removeItem(LocalStorageKey.USER);
            }
            return Promise.reject({ ...error })
        };
        const successHandler = (response) => {
            return response;
        };
    }
};
