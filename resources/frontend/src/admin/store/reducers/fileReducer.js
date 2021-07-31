import {fileActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case fileActionType.ADD_FILE:
            return [...state, action.payload];
        default:
            return state;
    }
}
