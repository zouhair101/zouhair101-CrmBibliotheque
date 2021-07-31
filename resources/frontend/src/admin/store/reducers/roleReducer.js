import {roleActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case roleActionType.FETCH_ROLES:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case roleActionType.FETCH_ROLE:
        case roleActionType.EDIT_ROLE:
        case roleActionType.ADD_ROLE:
            return {...state, [action.payload.id]: action.payload};
        case roleActionType.DELETE_ROLE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
