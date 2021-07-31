import {bookRequestActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookRequestActionType.FETCH_ADMIN_BOOKS_REQUEST:
            return action.payload;
        case bookRequestActionType.EDIT_ADMIN_BOOK_REQUEST:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case bookRequestActionType.ADD_ADMIN_BOOK_REQUEST:
            return [...state, action.payload];
        case bookRequestActionType.DELETE_ADMIN_BOOK_REQUEST:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
