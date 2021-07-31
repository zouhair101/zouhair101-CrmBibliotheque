import {authActionType} from '../../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case authActionType.LOGIN:
        case authActionType.LOGOUT:
        case authActionType.ADMIN_RESET_PASSWORD:
            return action.payload;
        case authActionType.ADMIN_FORGOT_PASSWORD:
            return { isSubmitted: action.payload };
        default:
            return state;
    }
}
