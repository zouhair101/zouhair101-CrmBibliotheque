import {settingActionType, settingsKey, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {getOrSetCurrency} from "../../../store/action/currencyAction";
import apiConfigWthFormData from "../../config/apiConfigWthFormData";
import {editAppSetting} from "../../../store/action/appSettingAction";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL, homeSettingsActionsType} from "../../../constants";

export const fetchSettings = (isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get(apiBaseURL.MY_SETTINGS)
        .then((response) => {
            dispatch({ type: settingActionType.FETCH_SETTING, payload: response.data.data });
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            isLoading ? dispatch(setLoading(false)) : null;
        });
};
