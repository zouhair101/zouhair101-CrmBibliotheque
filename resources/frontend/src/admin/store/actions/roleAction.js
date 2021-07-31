import {roleActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchRoles = (isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get(apiBaseURL.ROLE)
        .then((response) => {
            dispatch({ type: roleActionType.FETCH_ROLES, payload: response.data.data });
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addRole = (role) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.ROLE, role)
        .then((response) => {
            dispatch({ type: roleActionType.ADD_ROLE, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('roles.success.create.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editRole = (roleId, role) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.ROLE + '/' + roleId, role)
        .then((response) => {
            dispatch({ type: roleActionType.EDIT_ROLE, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('roles.success.edit.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteRole = (roleId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.ROLE + '/' + roleId)
        .then(() => {
            dispatch({ type: roleActionType.DELETE_ROLE, payload: roleId });
            dispatch(addToast({ text: getFormattedMessage('roles.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
