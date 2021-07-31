import apiConfig from '../../../config/apiConfig';
import {apiBaseURL, homeSettingsActionsType} from '../../../constants';
import {setLoading} from "../../../store/action/progressBarAction";

export const fetchHomeSettings = (isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    await apiConfig.get(apiBaseURL.HOME_SETTING)
        .then((response) => {
            dispatch({type: homeSettingsActionsType.FETCH_HOME_SETTINGS, payload: response.data.data});
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({response}) => {
            isLoading ? dispatch(setLoading(false)) : null;
        });
};
