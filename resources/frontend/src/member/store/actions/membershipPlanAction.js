import {membershipPlanActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toastType} from '../../constants';
import {apiBaseURL} from "../../../constants";

export const fetchMembershipPlans = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.MEMBER_PLAN)
        .then((response) => {
            dispatch({ type: membershipPlanActionType.FETCH_MEMBERSHIP_PLANS, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};
