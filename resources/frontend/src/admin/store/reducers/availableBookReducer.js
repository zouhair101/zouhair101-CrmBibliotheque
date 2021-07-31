import {availableBookActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case availableBookActionType.FETCH_AVAILABLE_BOOKS:
            return [...action.payload];
        default:
            return state;
    }
}
