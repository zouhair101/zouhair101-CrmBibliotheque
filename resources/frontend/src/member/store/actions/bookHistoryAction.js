import {bookHistoryActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {setLoading} from '../../../store/action/progressBarAction';
import {toggleModal} from "../../../store/action/modalAction";
import {setTotalRecord} from "./totalRecordAction";
import requestParam from "../../../shared/requestParam";
import {apiBaseURL} from "../../../constants";
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const fetchBooksHistory = (filter) => async (dispatch) => {
    dispatch(setLoading(true));
    let url = apiBaseURL.BOOK_HISTORY;
    if (filter.limit || filter.order_By || filter.search) {
        url += requestParam(filter);
    }
    await apiConfig.get(url).then((response) => {
        dispatch({ type: bookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY, payload: response.data.data });
        dispatch(setTotalRecord(response.data.totalRecords));
        dispatch(setLoading(false));
    }).catch(({ response }) => {
        dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        dispatch(setLoading(false));
    });
};

export const unReserveBook = (bookItemId) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.BOOK + '/' + bookItemId + '/un-reserve-book', {})
        .then(response => {
            dispatch({ type: bookHistoryActionType.BOOK_UN_RESERVED, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('books.success.unreserve.message') }));
            dispatch(toggleModal());
        }).catch(({ response }) => {
            dispatch(toggleModal());
            addToast({ text: response.data.message, type: toastType.ERROR });
        });
};
