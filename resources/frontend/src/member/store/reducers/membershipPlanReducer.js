import {membershipPlanActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case membershipPlanActionType.FETCH_MEMBERSHIP_PLANS:
            return [...action.payload];
        default:
            return state;
    }
}
