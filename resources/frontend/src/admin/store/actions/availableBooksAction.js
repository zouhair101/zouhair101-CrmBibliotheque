import {availableBookActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {apiBaseURL} from "../../../constants";

export const fetchAvailableBooks = (bookId, memberId) => async (dispatch) => {
    await apiConfig.get(`${apiBaseURL.BOOK}/${bookId}/available-books?member_id=${memberId}`)
        .then((response) => {
            dispatch({ type: availableBookActionType.FETCH_AVAILABLE_BOOKS, payload: response.data.data });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
