import {bookItemActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const setBookItems = (bookItems) => async (dispatch) => {
    dispatch({ type: bookItemActionType.SET_BOOKS_ITEMS, payload: bookItems });
};

export const addBookItem = (items, bookId, isEdit = false) => async (dispatch) => {
    await apiConfig.post(`${apiBaseURL.BOOK}/${+bookId}/items`, items)
        .then((response) => {
            dispatch({ type: bookItemActionType.ADD_BOOK_ITEM, payload: response.data.data.items });
            dispatch(addToast({
                text:
                    getFormattedMessage(isEdit ? 'books.items.success.edit.message' : 'books.items.success.create.message')
            }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteBookItem = (bookItemId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.BOOK_ITEM + '/' + bookItemId)
        .then(() => {
            dispatch({ type: bookItemActionType.DELETE_BOOK_ITEM, payload: bookItemId });
            dispatch(addToast({ text: getFormattedMessage('books.items.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
