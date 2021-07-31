import apiConfig from '../../../config/apiConfig';
import {setLoading} from '../../../store/action/progressBarAction';
import {addToast} from '../../../store/action/toastAction';
import {apiBaseURL} from "../../../constants";
import {testimonialActionType} from "../../../admin/constants";
import {toastType} from "../../constants";

export const fetchTestimonials = () => async (dispatch) => {
    dispatch(setLoading(true));
    let url = apiBaseURL.TESTIMONIAL;
    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: testimonialActionType.FETCH_TESTIMONIALS, payload: response.data.data });
            dispatch(setLoading(false));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            dispatch(setLoading(false));
        });
};
