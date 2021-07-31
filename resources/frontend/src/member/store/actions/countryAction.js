import {countryActionType} from '../../constants';
import apiConfig from '../../config/apiConfig';
import {addToast} from '../../../store/action/toastAction';
import {toastType} from '../../constants';
import {apiBaseURL} from "../../../constants";

export const fetchCountries = () => async (dispatch) => {
    await apiConfig.get(apiBaseURL.COUNTRY)
        .then((response) => {
            dispatch({ type: countryActionType.FETCH_COUNTRIES, payload: response.data.data });
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
