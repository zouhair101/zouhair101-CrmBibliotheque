import {constants} from "../../constants";

export default (state = false, action) => {
    switch (action.type) {
        case constants.PENALTIY_MODAL_ACTION:
            return !state;
        default:
            return state;
    }
}
