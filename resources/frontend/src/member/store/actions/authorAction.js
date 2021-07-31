import {authorActionType, toastType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {setLoading} from '../../../store/action/progressBarAction';
import {apiBaseURL} from "../../../constants";

export const fetchAuthors = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig.get(apiBaseURL.AUTHOR)
        .then((response) => {
            dispatch({type: authorActionType.FETCH_AUTHORS, payload: response.data.data});
            dispatch(setLoading(false));
        })
        .catch(({response}) => {
            dispatch(addToast({text: response.data.message, type: toastType.ERROR}));
            dispatch(setLoading(false));
        });
};
