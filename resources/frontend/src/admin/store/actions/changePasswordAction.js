import {toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";
import {toggleChangePasswordModal} from "../../../store/action/changePasswordModalAction";

export const onChangePassword = (passwords) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.CHANGE_PASSWORD, passwords)
        .then((response) => {
            dispatch(addToast({ text: getFormattedMessage('change-password.success.message') }));
            dispatch(toggleChangePasswordModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
