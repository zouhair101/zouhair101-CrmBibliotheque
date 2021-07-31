import {membershipPlanActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case membershipPlanActionType.FETCH_MEMBERSHIP_PLANS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case membershipPlanActionType.FETCH_MEMBERSHIP_PLAN:
        case membershipPlanActionType.EDIT_MEMBERSHIP_PLAN:
        case membershipPlanActionType.ADD_MEMBERSHIP_PLAN:
            return {...state, [action.payload.id]: action.payload};
        case membershipPlanActionType.DELETE_MEMBERSHIP_PLAN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
