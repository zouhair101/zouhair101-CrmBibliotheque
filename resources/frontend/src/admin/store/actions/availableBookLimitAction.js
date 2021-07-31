import {availableBookLimitActionType, bookCirculationStatusConstant, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {apiBaseURL} from "../../../constants";

export const fetchAvailableBookLimit = (memberId, status) => async (dispatch) => {
    await apiConfig.get(`${apiBaseURL.MEMBER}/${memberId}/status/${status}`)
        .then((response) => {
            if (status === bookCirculationStatusConstant.BOOK_ISSUED) {
                dispatch({
                    type: availableBookLimitActionType.FETCH_AVAILABLE_ISSUE_BOOK_LIMIT,
                    payload: { isExceed: response.data.data, status }
                });
            } else {
                dispatch({
                    type: availableBookLimitActionType.FETCH_AVAILABLE_RESERVE_BOOK_LIMIT,
                    payload: { isExceed: response.data.data, status }
                });
            }
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const clearAvailableBookLimit = () => {
    return { type: availableBookLimitActionType.CLEAR_AVAILABLE_RESERVE_BOOK_LIMIT }
};
