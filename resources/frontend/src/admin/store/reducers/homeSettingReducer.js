import _ from 'lodash';
import {homeSettingsActionsType} from "../../../constants";

export default (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case homeSettingsActionsType.FETCH_HOME_SETTINGS:
        case homeSettingsActionsType.PUT_HOME_SETTINGS:
            return {..._.mapKeys(payload, 'key')};
        default:
            return state;
    }
}
