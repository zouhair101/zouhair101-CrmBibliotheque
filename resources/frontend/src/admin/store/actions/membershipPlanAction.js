import {membershipPlanActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchMembershipPlans = (isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get(apiBaseURL.MEMBER_PLAN)
        .then((response) => {
            dispatch({ type: membershipPlanActionType.FETCH_MEMBERSHIP_PLANS, payload: response.data.data });
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addMembershipPlan = (membershipPlan) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.MEMBER_PLAN, membershipPlan)
        .then((response) => {
            dispatch({ type: membershipPlanActionType.ADD_MEMBERSHIP_PLAN, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('membership-plans.success.create.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editMembershipPlan = (membershipPlanId, membershipPlan) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.MEMBER_PLAN + '/' + membershipPlanId, membershipPlan)
        .then((response) => {
            dispatch({ type: membershipPlanActionType.EDIT_MEMBERSHIP_PLAN, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('membership-plans.success.edit.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteMembershipPlan = (membershipPlanId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.MEMBER_PLAN + '/' + membershipPlanId)
        .then(() => {
            dispatch({ type: membershipPlanActionType.DELETE_MEMBERSHIP_PLAN, payload: membershipPlanId });
            dispatch(addToast({ text: getFormattedMessage('membership-plans.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
