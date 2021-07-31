import {bookActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookActionType.FETCH_BOOKS:
            return [...action.payload];
        case bookActionType.FETCH_FEATURED_BOOKS:
            return [...action.payload];
        default:
            return state;
    }
}
