import {genreActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {toggleModal} from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import {setTotalRecord} from "./totalRecordAction";
import _ from 'lodash';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {apiBaseURL} from "../../../constants";

export const fetchGenres = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = apiBaseURL.GENRE;

    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }

    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: genreActionType.FETCH_GENRES, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addGenre = (genre ,filterObj) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.GENRE, genre)
        .then((response) => {
            dispatch({ type: genreActionType.ADD_GENRE, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('genres.success.create.message') }));
            dispatch(toggleModal());
            dispatch(fetchGenres(filterObj));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editGenre = (genreId, genre) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.GENRE + '/' + genreId, genre)
        .then((response) => {
            dispatch({ type: genreActionType.EDIT_GENRE, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('genres.success.edit.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteGenre = (genreId) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.GENRE + '/' + genreId)
        .then(() => {
            dispatch({ type: genreActionType.DELETE_GENRE, payload: genreId });
            dispatch(addToast({ text: getFormattedMessage('genres.success.delete.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
