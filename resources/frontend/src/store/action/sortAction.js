import {constants} from '../../constants';

export const sortAction = (sortObject) => async dispatch => {
    dispatch({type: constants.SORT_ACTION, payload: sortObject});
};
