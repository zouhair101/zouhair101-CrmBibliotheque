import {authActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfigWithoutToken';
import apiConfigWithRoot from '../../config/apiConfigwithoutTokenWithRoot';
import {addToast} from '../../../store/action/toastAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL, LocalStorageKey, loggedConstant, Routes, Tokens} from "../../../constants";
import {setUserProfile} from "../../../store/action/localStorageAction";
import {getLocalStorageDataByEncryptKey} from "../../../shared/sharedMethod";
import {setLoading} from "../../../store/action/progressBarAction";

export const login = (user, history) => async (dispatch) => {
    const { email, password } = user;
    await apiConfig.post(apiBaseURL.MEMBER_LOGIN, { email, password })
        .then((response) => {
            if (user.remember_me) {
                localStorage.setItem('currentMember', btoa(JSON.stringify(user)));
            } else {
                if (getLocalStorageDataByEncryptKey('currentMember')) {
                    localStorage.removeItem('currentMember');
                }
            }
            localStorage.setItem(Tokens.MEMBER, response.data.data.token);
            localStorage.removeItem(loggedConstant.IS_MEMBER_LOGOUT);
            dispatch(setUserProfile(LocalStorageKey.MEMBER, response.data.data.user));
            history.push(Routes.MEMBER_DEFAULT);
            dispatch({ type: authActionType.LOGIN, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('login.success.logged.message') }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const forgotPassword = (user) => async (dispatch) => {
    await apiConfigWithRoot.post(apiBaseURL.MEMBER_FORGOT_PASSWORD, user)
        .then(() => {
            dispatch({ type: authActionType.FORGOT_PASSWORD, payload: true });
            dispatch(addToast({ text: getFormattedMessage('forgot-password.success.message') }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const resetPassword = (user, history) => async (dispatch) => {
    await apiConfigWithRoot.post(apiBaseURL.MEMBER_RESET_PASSWORD, user)
        .then(() => {
            dispatch({ type: authActionType.RESET_PASSWORD, payload: user });
            dispatch(addToast({ text: getFormattedMessage('reset-password.success.message') }));
            history.push(Routes.MEMBER_LOGIN)
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

/**
 * This method used for register a member
 * @param user
 * @param history
 * @returns {Function}
 */
export const registration = (user, history) => async (dispatch) => {
    dispatch(setLoading(true));
    const { email, password, first_name, last_name } = user;
    await apiConfig.post(apiBaseURL.MEMBER_REGISTRATION, {  email, password, first_name, last_name })
        .then((response) => {
            history.push(Routes.MEMBER_LOGIN);
            dispatch({ type: authActionType.REGISTRATION, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('registration.success.message') }));
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};