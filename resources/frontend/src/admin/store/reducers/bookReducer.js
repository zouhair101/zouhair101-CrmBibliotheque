import {bookActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookActionType.FETCH_BOOKS:
            return action.payload;
        case bookActionType.FETCH_BOOK:
            return [action.payload];
        case bookActionType.EDIT_BOOK:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case bookActionType.ADD_BOOK:
            return [...state, action.payload];
        case bookActionType.DELETE_BOOK:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
