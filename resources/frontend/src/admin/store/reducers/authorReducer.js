import {authorActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case authorActionType.FETCH_AUTHORS:
            return action.payload;
        case authorActionType.EDIT_AUTHOR:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case authorActionType.ADD_AUTHOR:
            return [...state, action.payload];
        case authorActionType.DELETE_AUTHOR:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
