import {bookActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookActionType.FETCH_FEATURED_CARDS:
            return [...action.payload];
        default:
            return state;
    }
}
