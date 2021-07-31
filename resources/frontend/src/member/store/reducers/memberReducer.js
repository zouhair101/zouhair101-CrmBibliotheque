import {memberActionType} from '../../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case memberActionType.FETCH_MEMBER:
        case memberActionType.EDIT_MEMBER:
            return {...action.payload};
        default:
            return state;
    }
}
