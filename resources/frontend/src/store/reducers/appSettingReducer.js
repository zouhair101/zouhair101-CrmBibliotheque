import {appSettingActionType} from '../../constants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case appSettingActionType.FETCH_APP_SETTING:
            return { ..._.mapKeys(action.payload, 'key') };
        case  appSettingActionType.EDIT_APP_SETTING:
            return { ...state, [action.payload.key]: action.payload };
        default:
            return state;
    }
}
