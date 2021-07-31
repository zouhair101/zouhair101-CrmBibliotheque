import {genreActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case genreActionType.FETCH_GENRES:
            return action.payload;
        case genreActionType.EDIT_GENRE:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case genreActionType.ADD_GENRE:
            return [...state, action.payload];
        case genreActionType.DELETE_GENRE:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
