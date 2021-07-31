import {bookActionType, toastType} from '../../constants';
import {addToast} from '../../../store/action/toastAction';
import {apiBaseURL} from "../../../constants";
import axios from 'axios';
import {environment} from "../../../environment";

export const fetchTotalBooks = () => async (dispatch) => {
    await axios.get(environment.URL + '/api/' + apiBaseURL.TOTAL_BOOKS)
        .then((response) => {
            dispatch({type: bookActionType.FETCH_TOTAL_BOOKS, payload: response.data.data});
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
        });
};
