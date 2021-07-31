import {bookActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookActionType.EXPORT_BOOK:
            return [...state, action.payload];
        default:
            return state;
    }
}
