import {bookRequestActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import _ from 'lodash';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchBookRequests = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = apiBaseURL.BOOK_REQUEST;
    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: bookRequestActionType.FETCH_ADMIN_BOOKS_REQUEST, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addBookRequest = (bookRequest, filterObj) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.BOOK_REQUEST, bookRequest)
        .then((response) => {
            dispatch({ type: bookRequestActionType.ADD_ADMIN_BOOK_REQUEST, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('book-request.success.create.message') }));
            dispatch(toggleModal());
            dispatch(fetchBookRequests(filterObj));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editBookRequest = (bookRequestId, bookRequest) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.BOOK_REQUEST + '/' + bookRequestId, bookRequest)
        .then((response) => {
            dispatch({ type: bookRequestActionType.EDIT_ADMIN_BOOK_REQUEST, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('book-request.success.edit.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteBookRequest = (bookRequestId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.BOOK_REQUEST + '/' + bookRequestId)
        .then(() => {
            dispatch({ type: bookRequestActionType.DELETE_ADMIN_BOOK_REQUEST, payload: bookRequestId });
            dispatch(addToast({ text: getFormattedMessage('book-request.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
