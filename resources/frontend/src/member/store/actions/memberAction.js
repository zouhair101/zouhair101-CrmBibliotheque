import {memberActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toastType} from '../../constants';
import {setUserProfile} from "../../../store/action/localStorageAction";
import {LocalStorageKey} from "../../../constants";
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const fetchMember = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`member-details`)
        .then((response) => {
            dispatch({ type: memberActionType.FETCH_MEMBER, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const editMember = (member, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData.post(`update-member-profile`, member)
        .then((response) => {
            dispatch({ type: memberActionType.EDIT_MEMBER, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('profile.success.update.message') }));
            dispatch(setLoading(false));
            dispatch(setUserProfile(LocalStorageKey.MEMBER, response.data.data));
            history.goBack();
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};
