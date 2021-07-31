import {userActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case userActionType.FETCH_USERS:
            return action.payload;
        case userActionType.FETCH_USER:
            return [action.payload];
        case userActionType.SET_ACTIVE_DE_ACTIVE:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case userActionType.ADD_USER:
            return [...state, action.payload];
        case userActionType.EDIT_USER:
            const user = JSON.parse(atob(localStorage.getItem('user')));
            if (user && user.id === action.payload.id) {
                localStorage.removeItem('user');
                localStorage.setItem('user', btoa(JSON.stringify(action.payload)));
            }
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case userActionType.DELETE_USER:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
