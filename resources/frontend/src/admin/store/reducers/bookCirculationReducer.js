import {bookCirculationActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookCirculationActionType.FETCH_BOOKS_CIRCULATION:
            return action.payload;
        case bookCirculationActionType.FETCH_BOOK_CIRCULATION:
            return [action.payload];
        case bookCirculationActionType.DELETE_BOOK_CIRCULATION:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
