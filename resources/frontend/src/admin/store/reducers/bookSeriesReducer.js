import {bookSeriesActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case bookSeriesActionType.FETCH_BOOKS_SERIES:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case bookSeriesActionType.FETCH_BOOK_SERIES:
        case bookSeriesActionType.EDIT_BOOK_SERIES:
        case bookSeriesActionType.ADD_BOOK_SERIES:
            return {...state, [action.payload.id]: action.payload};
        case bookSeriesActionType.DELETE_BOOK_SERIES:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
