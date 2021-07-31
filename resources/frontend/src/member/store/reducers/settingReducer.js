import {settingActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case settingActionType.FETCH_SETTING:
        case settingActionType.POST_SETTINGS:
            return { ..._.mapKeys(payload, 'key') };
        default:
            return state;
    }
}
