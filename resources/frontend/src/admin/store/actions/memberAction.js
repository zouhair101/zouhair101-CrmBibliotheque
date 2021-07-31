import {memberActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import apiConfigWthFormData from '../../config/apiConfigWthFormData';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL, Routes} from "../../../constants";

export const fetchMembers = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = apiBaseURL.MEMBER;
    if (filter.limit || filter.order_By || filter.search) {
        url += requestParam(filter);
    }

    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: memberActionType.FETCH_MEMBERS, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const fetchMember = (memberId, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get(apiBaseURL.MEMBER + '/' + memberId)
        .then((response) => {
            dispatch({ type: memberActionType.FETCH_MEMBER, payload: response.data.data });
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addMember = (member, history) => async (dispatch) => {
    await apiConfigWthFormData.post(apiBaseURL.MEMBER, member)
        .then((response) => {
            dispatch({ type: memberActionType.ADD_MEMBER, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('members.success.create.message') }));
            history.push(Routes.MEMBERS);
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editMember = (memberId, member, history) => async (dispatch) => {
    await apiConfigWthFormData.post(apiBaseURL.MEMBER + '/' + memberId, member)
        .then((response) => {
            dispatch({ type: memberActionType.EDIT_MEMBER, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('members.success.edit.message') }));
            history.push(Routes.MEMBERS);
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteMember = (memberId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.MEMBER + '/' + memberId)
        .then(() => {
            dispatch({ type: memberActionType.DELETE_MEMBER, payload: memberId });
            dispatch(addToast({ text: getFormattedMessage('members.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const activeInactiveMember = (memberId, isActive) => async (dispatch) => {
    await apiConfig.get(apiBaseURL.MEMBER + '/' + memberId + '/update-status')
        .then((response) => {
            dispatch({ type: memberActionType.SET_ACTIVE_DE_ACTIVE, payload: response.data.data });
            dispatch(addToast({
                text:
                    getFormattedMessage(!isActive ? 'members.success.active-account.message' :
                        'members.success.inactive-account.message')
            }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const meberSendMail = (id) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.MEMBER + '/' + id + '/re-activation')
        .then((response) => {
            dispatch(addToast({ text: response.data.message}));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
}
