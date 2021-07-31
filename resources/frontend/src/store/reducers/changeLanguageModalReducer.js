import {constants} from "../../constants";

export default (state = false, action) => {
    switch (action.type) {
        case constants.CHANGE_LANGUAGE_MODAL_ACTION:
            return !state;
        default:
            return state;
    }
}
