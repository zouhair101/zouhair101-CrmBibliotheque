import { cardActionType, toastType } from '../../constants';
import apiConfig from '../../config/apiConfig';
import { setLoading } from '../../../store/action/progressBarAction';
import { addToast } from '../../../store/action/toastAction';
import { toggleModal } from '../../../store/action/modalAction';
import requestParam from "../../../shared/requestParam";
import { setTotalRecord } from "./totalRecordAction";
import _ from 'lodash';
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL } from "../../../constants";

export const fetchCards = (filter = {}, isLoading = false) => async (dispatch) => {
    isLoading ? dispatch(setLoading(true)) : null;
    let url = apiBaseURL.ABOUT_US_CARD;

    if (!_.isEmpty(filter) && (filter.limit || filter.order_By || filter.search)) {
        url += requestParam(filter);
    }

    await apiConfig.get(url)
        .then((response) => {
            dispatch({ type: cardActionType.FETCH_CARDS, payload: response.data.data });
            dispatch(setTotalRecord(response.data.totalRecords));
            isLoading ? dispatch(setLoading(false)) : null;
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
            isLoading ? dispatch(setLoading(false)) : null;
        });
};

export const addCard = (card, filterObj) => async (dispatch) => {
    await apiConfig.post(apiBaseURL.ABOUT_US_CARD, card)
        .then((response) => {
            dispatch({ type: cardActionType.ADD_CARD, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('about-us-card.success.create.message') }));
            dispatch(toggleModal());
            dispatch(fetchCards(filterObj));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const editCard = (cardId, card) => async (dispatch) => {
    await apiConfig.put(apiBaseURL.ABOUT_US_CARD + '/' + cardId, card)
        .then((response) => {
            dispatch({ type: cardActionType.EDIT_CARD, payload: response.data.data });
            dispatch(addToast({ text: getFormattedMessage('about-us-card.success.edit.message') }));
            dispatch(toggleModal());
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};

export const deleteCard = (cardId, filterObj) => async (dispatch) => {
    await apiConfig.delete(apiBaseURL.ABOUT_US_CARD + '/' + cardId)
        .then(() => {
            dispatch({ type: cardActionType.DELETE_CARD, payload: cardId });
            dispatch(addToast({ text: getFormattedMessage('about-us-card.success.delete.message') }));
            dispatch(toggleModal());
            dispatch(fetchCards(filterObj));
        })
        .catch(({ response }) => {
            dispatch(addToast({ text: response.data.message, type: toastType.ERROR }));
        });
};
