import {localStorageActionType} from "../../constants";

export const getUserProfile = (user) => {
    return {
        type: localStorageActionType.GET_PROFILE,
        payload: user
    };
};

export const setUserProfile = (user, data) => {
    return {
        type: localStorageActionType.SET_PROFILE,
        payload: { user, data: data }
    };
};

export const clearUserProfile = (user) => {
    return {
        type: localStorageActionType.CLEAR_PROFILE,
        payload: user
    };
};
