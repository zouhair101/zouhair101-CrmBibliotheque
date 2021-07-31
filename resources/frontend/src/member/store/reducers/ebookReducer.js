import {eBookActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case eBookActionType.FETCH_E_BOOKS:
            return [...action.payload];

        default:
            return state;
    }
}
