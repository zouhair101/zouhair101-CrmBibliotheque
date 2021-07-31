import {constants} from "../../constants";

export default (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case constants.ADD_TOAST:
            return [payload, ...state];
        case constants.REMOVE_TOAST:
            return state.filter(toast => toast.id !== payload);
        default:
            return state;
    }
}
