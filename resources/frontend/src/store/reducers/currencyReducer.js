import {constants} from '../../constants';

export default (state = 'INR', action) => {
    switch (action.type) {
        case constants.GET_SET_CURRENCY:
            return action.payload;
        default:
            return state;
    }
}
