import {bookActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {setLoading} from '../../../store/action/progressBarAction';
import {apiBaseURL} from "../../../constants";
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const findBooks = (params) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(`${apiBaseURL.SEARCH_BOOK}?${params}`)
        .then((response) => {
            dispatch({ type: bookActionType.SEARCH_BOOKS, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const resetSearchBooks = () => (dispatch) => {
    dispatch({ type: bookActionType.RESET_SEARCH_BOOKS });
};

export const reserveBook = (bookItemId, index) => async (dispatch) => {
    apiConfig.post(apiBaseURL.BOOK + '/' + bookItemId + '/reserve-book ', {})
        .then((response) => {
            dispatch({
                type: bookActionType.RESERVE_BOOK,
                payload: {
                    status: response.data.data.book_item.status,
                    index,
                    expectedAvailableDate: response.data.data.expected_available_date
                }
            });
            dispatch(addToast({ text: getFormattedMessage('books.success.reserve.message') }));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
