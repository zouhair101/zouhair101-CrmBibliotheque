import {availableBookLimitActionType} from '../../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case availableBookLimitActionType.FETCH_AVAILABLE_ISSUE_BOOK_LIMIT:
            return { isIssueLimitExceed: action.payload };
        case availableBookLimitActionType.FETCH_AVAILABLE_RESERVE_BOOK_LIMIT:
            return { isReserveLimitExceed: action.payload };
        case availableBookLimitActionType.CLEAR_AVAILABLE_RESERVE_BOOK_LIMIT:
            return {};
        default:
            return state;
    }
}
