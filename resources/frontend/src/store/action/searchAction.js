import {constants} from '../../constants';

export const searchFilter = (searchTerm) => async (dispatch) => {
    dispatch({type: constants.SEARCH_ACTION, payload: searchTerm});
};
