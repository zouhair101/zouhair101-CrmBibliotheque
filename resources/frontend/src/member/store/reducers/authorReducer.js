import {authorActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case authorActionType.FETCH_AUTHORS:
            return [...action.payload];
        default:
            return state;
    }
}
