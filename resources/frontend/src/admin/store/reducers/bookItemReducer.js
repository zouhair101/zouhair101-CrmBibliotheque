import {bookItemActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case bookItemActionType.SET_BOOKS_ITEMS:
        case bookItemActionType.ADD_BOOK_ITEM:
            return {..._.mapKeys(action.payload, 'id')};
        case bookItemActionType.DELETE_BOOK_ITEM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}
