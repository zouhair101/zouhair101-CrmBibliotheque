import {bookActionType} from '../../constants';

export default (state = 0, action) => {
    switch (action.type) {
        case bookActionType.FETCH_TOTAL_BOOKS:
            return action.payload;
        default:
            return state;
    }
}
