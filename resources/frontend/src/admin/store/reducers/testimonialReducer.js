import {testimonialActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case testimonialActionType.FETCH_TESTIMONIALS:
            return action.payload;
        case testimonialActionType.FETCH_TESTIMONIAL:
            return [action.payload];
        case testimonialActionType.ADD_TESTIMONIAL:
            return [...state, action.payload];
        case testimonialActionType.EDIT_TESTIMONIAL:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case testimonialActionType.DELETE_TESTIMONIAL:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}
