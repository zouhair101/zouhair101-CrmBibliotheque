import {tagActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import _ from 'lodash';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchTags = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = apiBaseURL.TAG;
    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }

    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: tagActionType.FETCH_TAGS, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addTag = (tag, filterObj) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.TAG, tag)
        .then((response) => {
            dispatch({ type: tagActionType.ADD_TAG, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('tags.success.create.message') }));
            dispatch(toggleModal());
            dispatch(fetchTags(filterObj));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editTag = (tagId, tag) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.TAG + '/' + tagId, tag)
        .then((response) => {
            dispatch({ type: tagActionType.EDIT_TAG, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('tags.success.edit.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteTag = (tagId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.TAG + '/' + tagId)
        .then(() => {
            dispatch({ type: tagActionType.DELETE_TAG, payload: tagId });
            dispatch(addToast({ text: getFormattedMessage('tags.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
