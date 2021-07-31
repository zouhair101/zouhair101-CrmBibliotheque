import {memberBookHistoryActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from "../../../store/action/modalAction";
import {getApiRouteForBookCirculation, getBookCirculationSuccessMessage} from "../../shared/sharedMethod";
import {setLoading} from "../../../store/action/progressBarAction";
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import {getFormattedMessage} from "../../../shared/sharedMethod";

export const fetchMemberBooksHistory = (memberId, filter = {}) => async (dispatch) => {
    dispatch(setLoading(true));
    let url = `members/${memberId}/books-history`;
    if (filter.limit || filter.order_By || filter.search) {
        url += requestParam(filter);
    }
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: memberBookHistoryActionType.FETCH_MEMBER_BOOK_HISTORY, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const editMemberBookHistory = (book) => async (dispatch) => {
    await apiConfig.post(`books/${book.book_item_id}/${getApiRouteForBookCirculation(book.status)}`, book)
        .then((response) => {
            dispatch({ type: memberBookHistoryActionType.EDIT_MEMBER_BOOK_HISTORY, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage(getBookCirculationSuccessMessage(book.status)) }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editMemberBookHistoryStatus = (book) => async (dispatch) => {
    await apiConfig.put(`books/${book.book_item_id}/update-issued-book-status`, { status: book.status })
        .then((response) => {
            dispatch({ type: memberBookHistoryActionType.EDIT_MEMBER_BOOK_HISTORY, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage(getBookCirculationSuccessMessage(book.status)) }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
