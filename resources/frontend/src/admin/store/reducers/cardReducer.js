import { cardActionType } from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case cardActionType.FETCH_CARDS:
            return action.payload;
        case cardActionType.EDIT_CARD:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case cardActionType.ADD_CARD:
            return [...state, action.payload];
        case cardActionType.DELETE_CARD:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
