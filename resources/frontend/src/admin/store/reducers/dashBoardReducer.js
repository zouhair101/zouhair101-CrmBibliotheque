import {dashBoardActionType} from '../../constants';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case dashBoardActionType.FETCH_DASHBOARD_DETAILS:
            return { ...state, general: payload };
        case dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_TODAY:
            return { ...state, today: payload };
        case dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_CURRENT_WEEK:
            return { ...state, currentWeek: payload };
        case dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_LAST_WEEK:
            return { ...state, lastWeek: payload };
        case dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_CURRENT_MONTH:
            return { ...state, currentMonth: payload };
        case dashBoardActionType.FETCH_DASHBOARD_DETAILS_BY_LAST_MONTH:
            return { ...state, lastMonth: payload };
        case dashBoardActionType.FETCH_DASHBOARD_DETAILS_BETWEEN_MONTHS:
            return { ...state, interMonth: payload };
        default:
            return state;
    }
}
