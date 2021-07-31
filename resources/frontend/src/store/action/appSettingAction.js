import apiConfig from '../../config/apiConfig';
import {appSettingActionType} from '../../constants';
import {addToast} from "./toastAction";
import {toastType} from "../../member/constants";

export const fetchAppSetting = () => async (dispatch) => {
    await apiConfig.get('library-details')
        .then((response) => {
            dispatch({ type: appSettingActionType.FETCH_APP_SETTING, payload: response.data.data });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editAppSetting = (appSetting) => {
    return { type: appSettingActionType.EDIT_APP_SETTING, payload: appSetting }
};
