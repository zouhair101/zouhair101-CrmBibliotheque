import {bookLanguageActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case bookLanguageActionType.FETCH_BOOK_LANGUAGES:
            return action.payload;
        case bookLanguageActionType.ADD_BOOK_LANGUAGE:
            return [...state, action.payload];
        case bookLanguageActionType.EDIT_BOOK_LANGUAGE:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case bookLanguageActionType.DELETE_BOOK_LANGUAGE:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
