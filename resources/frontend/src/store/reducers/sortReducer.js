import {constants} from "../../constants";

export default (state = {orderBy: 'item_name', order: 'desc'}, action) => {
    switch (action.type) {
        case constants.SORT_ACTION:
            return {...action.payload};
        default:
            return state;
    }
}
