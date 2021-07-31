import {permissionActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {apiBaseURL} from "../../../constants";

export const fetchPermissions = () => async (dispatch) => {
    await apiConfig.get(apiBaseURL.PERMISSION)
        .then((response) => {
            dispatch({ type: permissionActionType.FETCH_PERMISSIONS, payload: response.data.data });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
