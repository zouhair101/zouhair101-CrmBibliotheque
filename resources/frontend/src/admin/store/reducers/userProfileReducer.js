import {userProfileActionType} from '../../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case userProfileActionType.FETCH_USER_PROFILE:
        case userProfileActionType.EDIT_USER_PROFILE:
            return {...action.payload};
        default:
            return state;
    }
}
