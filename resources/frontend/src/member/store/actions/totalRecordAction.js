import {constants} from '../../constants';

export const setTotalRecord = (totalRecord) => {
    return { type: constants.SET_TOTAL_RECORD, payload: totalRecord };
};
