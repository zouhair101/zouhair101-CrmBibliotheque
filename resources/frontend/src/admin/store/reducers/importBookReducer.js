import {importActionType} from "../../constants";

export default (state = {}, action) => {
    switch (action.type) {
        case importActionType.CLEAR_IMPORT_BOOK:
        case importActionType.FETCH_IMPORT_BOOK:
            return action.payload;
        default:
            return state;
    }
}
