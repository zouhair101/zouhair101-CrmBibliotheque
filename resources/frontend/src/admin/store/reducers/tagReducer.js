import {tagActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case tagActionType.FETCH_TAGS:
            return action.payload;
        case tagActionType.EDIT_TAG:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case tagActionType.ADD_TAG:
            return [...state, action.payload];
        case tagActionType.DELETE_TAG:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
