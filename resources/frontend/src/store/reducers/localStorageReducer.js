import {localStorageActionType} from "../../constants";

export default (state = {}, action) => {
    switch (action.type) {
        case localStorageActionType.SET_PROFILE:
            localStorage.setItem(action.payload.user, btoa(JSON.stringify(action.payload.data)));
            return action.payload.data;
        case localStorageActionType.GET_PROFILE:
            return localStorage.getItem(action.payload) ?
                JSON.parse(atob(localStorage.getItem(action.payload))) : null;
        default:
            return state;
    }
}
