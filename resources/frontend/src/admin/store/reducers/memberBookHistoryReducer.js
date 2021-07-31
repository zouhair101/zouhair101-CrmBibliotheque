import {memberBookHistoryActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case memberBookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY:
            return action.payload;
        case memberBookHistoryActionType.EDIT_MEMBER_BOOK_HISTORY:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        default:
            return state;
    }
}
