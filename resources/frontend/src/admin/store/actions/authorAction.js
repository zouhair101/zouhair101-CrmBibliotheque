import {authorActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import _ from 'lodash';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchAuthors = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = apiBaseURL.AUTHOR;
    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: authorActionType.FETCH_AUTHORS, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addAuthor = (author, filterObj = {}) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.AUTHOR, author)
        .then((response) => {
            dispatch({ type: authorActionType.ADD_AUTHOR, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('authors.success.create.message') }));
            dispatch(toggleModal());
            dispatch(fetchAuthors(filterObj));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editAuthor = (authorId, author) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.AUTHOR + '/' + authorId, author)
        .then((response) => {
            dispatch({ type: authorActionType.EDIT_AUTHOR, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('authors.success.edit.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteAuthor = (authorId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.AUTHOR + '/' + authorId)
        .then(() => {
            dispatch({ type: authorActionType.DELETE_AUTHOR, payload: authorId });
            dispatch(addToast({ text: getFormattedMessage('authors.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
