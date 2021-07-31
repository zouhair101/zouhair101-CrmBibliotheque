import {settingActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";
import {toggleChangeLanguageModal} from "../../../store/action/changeLanguageModalAction";

export const postSettings = (language) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.UPDATE_SETTINGS, language)
        .then((response) => {
            dispatch({ type: settingActionType.POST_SETTINGS, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('change-language.success.message') }));
            dispatch(toggleChangeLanguageModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
