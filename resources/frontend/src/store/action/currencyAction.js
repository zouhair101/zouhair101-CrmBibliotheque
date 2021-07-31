import {constants} from '../../constants';

export const getOrSetCurrency = (currency) => {
    return { type: constants.GET_SET_CURRENCY, payload: currency };
};
