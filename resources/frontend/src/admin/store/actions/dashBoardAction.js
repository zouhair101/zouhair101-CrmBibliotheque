import {chartLabelSelector, dashBoardActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {apiBaseURL} from "../../../constants";

const renderAction = (paramType, dispatch, data) => {
    switch (paramType) {
        case chartLabelSelector.TODAY:
            return dispatch({ type: dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_TODAY, payload: data });
        case chartLabelSelector.THIS_WEEK:
            return dispatch({ type: dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_CURRENT_WEEK, payload: data });
        case chartLabelSelector.LAST_WEEK:
            return dispatch({ type: dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_LAST_WEEK, payload: data });
        case chartLabelSelector.THIS_MONTH:
            return dispatch({ type: dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_CURRENT_MONTH, payload: data });
        case chartLabelSelector.LAST_MONTH:
            return dispatch({ type: dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_LAST_MONTH, payload: data });
        case chartLabelSelector.CUSTOM:
            return dispatch({ type: dashBoardActionType.FETCH_DASHBOARD_DETAILS_BETWEEN_MONTHS, payload: data });
        default:
            return dispatch({ type: dashBoardActionType.FETCH_DASHBOARD_DETAILS, payload: data });
    }
};

export const fetchDashBoardDetails = (param = {}) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.DASHBOARD_DETAILS, { params: param.params })
        .then((response) => {
            renderAction(param.type, dispatch, response.data.data);
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};
