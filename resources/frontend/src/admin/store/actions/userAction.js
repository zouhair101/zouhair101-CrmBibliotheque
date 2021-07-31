import {toastType, userActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import {setUserProfile} from "../../../store/action/localStorageAction";
import {apiBaseURL, LocalStorageKey} from "../../../constants";
import {getCurrentUser} from "../../shared/sharedMethod";
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const fetchUsers = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = apiBaseURL.USER;
    if (filter.limit || filter.order_By || filter.search) {
        url += requestParam(filter);
    }

    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: userActionType.FETCH_USERS, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const fetchUser = (userId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.USER + '/' + userId)
        .then((response) => {
            dispatch({ type: userActionType.FETCH_USER, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const addUser = (user, filterObj) => async (dispatch) => {
    await apiConfigWthFormData.post(apiBaseURL.USER, user)
        .then((response) => {
            dispatch({ type: userActionType.ADD_USER, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('users.success.create.message') }));
            dispatch(toggleModal());
            dispatch(fetchUsers(filterObj));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editUser = (userId, user) => async (dispatch) => {
    await apiConfigWthFormData.post(apiBaseURL.USER + '/' + userId, user)
        .then((response) => {
            dispatch({ type: userActionType.EDIT_USER, payload: response.data.data });
            if (getCurrentUser().id === userId) {
                dispatch(setUserProfile(LocalStorageKey.USER, response.data.data));
            }
            dispatch(addToast({ text: getFormattedMessage('users.success.edit.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteUser = (userId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.USER + '/' + userId)
        .then(() => {
            dispatch({ type: userActionType.DELETE_USER, payload: userId });
            dispatch(addToast({ text: getFormattedMessage('users.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const activeInactiveUser = (userId, isActive) => async (dispatch) => {
    await apiConfigWthFormData.get(apiBaseURL.USER + '/' + userId + '/update-status')
        .then((response) => {
            dispatch({ type: userActionType.SET_ACTIVE_DE_ACTIVE, payload: response.data.data });
            dispatch(addToast({
                text:
                    getFormattedMessage(!isActive ? 'users.success.active-account.message' :
                        'users.success.inactive-account.message')
            }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
