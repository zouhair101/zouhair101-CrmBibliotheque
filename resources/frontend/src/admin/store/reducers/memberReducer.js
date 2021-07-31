import {memberActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case memberActionType.FETCH_MEMBERS:
            return action.payload;
        case memberActionType.FETCH_MEMBER:
            return [action.payload];
        case memberActionType.EDIT_MEMBER:
        case memberActionType.SET_ACTIVE_DE_ACTIVE:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case memberActionType.ADD_MEMBER:
            return [...state, action.payload];
        case memberActionType.DELETE_MEMBER:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
