import {constants} from '../../constants';

export default (state = 0, action) => {
    switch (action.type) {
        case constants.SET_TOTAL_RECORD:
            return action.payload;
        default:
            return state;
    }
}
