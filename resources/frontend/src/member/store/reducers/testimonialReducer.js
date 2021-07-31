import {testimonialActionType} from "../../../admin/constants";

export default (state = [], action) => {
    if (action.type === testimonialActionType.FETCH_TESTIMONIALS) {
        return action.payload;
    }
    return state;
}
