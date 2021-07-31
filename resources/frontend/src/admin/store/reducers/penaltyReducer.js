import {penaltyActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case penaltyActionType.FETCH_PENALTY:
            return action.payload;
        default:
            return state;
    }
}
