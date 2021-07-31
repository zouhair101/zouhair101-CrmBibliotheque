import {countryActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case countryActionType.FETCH_COUNTRIES:
            return [...action.payload];
        default:
            return state;
    }
}
