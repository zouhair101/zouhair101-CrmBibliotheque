import {bookActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {setLoading} from '../../../store/action/progressBarAction';
import {apiBaseURL} from "../../../constants";
import axios from 'axios';
import {environment} from "../../../environment";
import {setTotalRecord} from "./totalRecordAction";

export const fetchBooks = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.BOOK)
        .then((response) => {
            dispatch({ type: bookActionType.FETCH_BOOKS, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};

export const fetchFeaturedBooks = () => async (dispatch) => {
    await axios.get(environment.URL + '/api/' + apiBaseURL.BOOK + '?is_featured=1')
        .then((response) => {
            dispatch({ type: bookActionType.FETCH_FEATURED_BOOKS, payload: response.data.data.books });
            dispatch({ type: bookActionType.FETCH_FEATURED_GENRES, payload: response.data.data.genres });
            dispatch({ type: bookActionType.FETCH_FEATURED_CARDS, payload: response.data.data.aboutUsCard });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const fetchBooksByNameOrAuthors = (param) => async (dispatch) => {
    await axios.get(environment.URL + '/api/' + apiBaseURL.BOOK + param)
        .then((response) => {
            dispatch({ type: bookActionType.SEARCH_BOOKS, payload: response.data.data.books });
            if (response.data.totalRecords === 0) {
                dispatch(addToast({ text: 'Sorry!! Books not found.' }));
            }
            dispatch(setTotalRecord(response.data.totalRecords));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
