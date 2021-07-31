import {userProfileActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toastType} from '../../constants';
import {setUserProfile} from "../../../store/action/localStorageAction";
import {apiBaseURL, LocalStorageKey} from "../../../constants";
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const fetchUserProfile = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.USER_DETAILS)
        .then((response) => {
            dispatch({ type: userProfileActionType.FETCH_USER_PROFILE, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const editUserProfile = (user, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData.post(apiBaseURL.USER_PROFILE_UPDATE, user)
        .then((response) => {
            dispatch({ type: userProfileActionType.EDIT_USER_PROFILE, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('profile.success.update.message') }));
            dispatch(setUserProfile(LocalStorageKey.USER, response.data.data));
            dispatch(setLoading(false));
            history.goBack();
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};
