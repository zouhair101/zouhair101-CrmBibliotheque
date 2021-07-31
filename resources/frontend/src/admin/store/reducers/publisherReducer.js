import {publisherActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case publisherActionType.FETCH_PUBLISHERS:
            return action.payload;
        case publisherActionType.EDIT_PUBLISHER:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case publisherActionType.ADD_PUBLISHER:
            return [...state, action.payload];
        case publisherActionType.DELETE_PUBLISHER:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
