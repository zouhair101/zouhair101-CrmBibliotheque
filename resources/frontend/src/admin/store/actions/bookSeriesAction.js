import {bookSeriesActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchBooksSeries = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.BOOK_SERIES)
        .then((response) => {
            dispatch({ type: bookSeriesActionType.FETCH_BOOKS_SERIES, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const fetchBookSeries = (bookSeriesId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.BOOK_SERIES + '/' + bookSeriesId)
        .then((response) => {
            dispatch({ type: bookSeriesActionType.FETCH_BOOK_SERIES, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const addBookSeries = (bookSeries, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.post(apiBaseURL.BOOK_SERIES, bookSeries)
        .then((response) => {
            dispatch({ type: bookSeriesActionType.ADD_BOOK_SERIES, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('books-series.success.create.message') }));
            dispatch(setLoading(false));
            history.push('/app/admin/books-series');
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const editBookSeries = (bookSeriesId, bookSeries, history) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.put(apiBaseURL.BOOK_SERIES + '/' + bookSeriesId, bookSeries)
        .then((response) => {
            dispatch({ type: bookSeriesActionType.EDIT_BOOK_SERIES, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('books-series.success.edit.message') }));
            dispatch(setLoading(false));
            history.push('/app/admin/books-series');
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const deleteBookSeries = (bookSeriesId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.BOOK_SERIES + '/' + bookSeriesId)
        .then(() => {
            dispatch({ type: bookSeriesActionType.DELETE_BOOK_SERIES, payload: bookSeriesId });
            dispatch(addToast({ text: getFormattedMessage('books-series.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
