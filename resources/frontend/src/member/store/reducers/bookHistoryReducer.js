import {bookHistoryActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY:
            return action.payload;
        case bookHistoryActionType.BOOK_UN_RESERVED:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        default:
            return state;
    }
}
