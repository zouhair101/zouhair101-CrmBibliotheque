import {settingsActionsType} from '../../constants';

export default (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case settingsActionsType.FETCH_CURRENCIES:
            payload.map((country) => {
                return country.country = country.country + ' (' + country.iso_code + ')'
            });
            return [...payload];
        default:
            return state;
    }
}
