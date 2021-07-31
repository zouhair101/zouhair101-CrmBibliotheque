import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookCirculationForm from './BookCirculationForm';
import Modal from '../../../shared/components/Modal';
import {addBookCirculation} from '../../store/actions/bookCirculationAction';
import {toastType} from "../../constants";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {addToast} from "../../../store/action/toastAction";
import {clearAvailableBookLimit} from "../../store/actions/availableBookLimitAction";
import {Filters} from "../../../constants";

const CreateBookCirculation = (props) => {
    const {
        toggleModal, className, title, bookLimit,
        books, onSelectBook, bookId, members, addBookCirculation,
        addToast,clearAvailableBookLimit
    } = props;
    const [isDisableSubmit, setDisableSubmit] = useState(false);
    const modalOption = { toggleModal, className, title };
    const formOption = { books, onSelectBook, bookId, members };

    useEffect(() => {
        displayLimitMessage(bookLimit);
    }, [bookLimit]);

    const displayLimitMessage = (bookLimit) => {
        if (!!bookLimit.isIssueLimitExceed && !bookLimit.isIssueLimitExceed.isExceed) {
            addToast({
                text: getFormattedMessage('books-circulation.issue.book-limit.message'),
                type: toastType.ERROR
            });
            setDisableSubmit(true);
        }
        else if (!!bookLimit.isReserveLimitExceed && !bookLimit.isReserveLimitExceed.isExceed) {
            addToast({
                text:
                    getFormattedMessage('books-circulation.reserve.book-limit.message'),
                type: toastType.ERROR
            });
            setDisableSubmit(true);
        } else {
            setDisableSubmit(false);
        }
    };

    const onSaveBookCirculation = (formValues) => {
        addBookCirculation(formValues, Filters.OBJ);
        clearAvailableBookLimit();
    };

    const onCancel = () => {
        clearAvailableBookLimit();
        toggleModal();
    };

    const prepareFormOption = {
        onSaveBookCirculation,
        onCancel,
        isDisableSubmit
    };
    return <Modal {...modalOption} content={<BookCirculationForm{...prepareFormOption} {...formOption}/>}/>
};

CreateBookCirculation.propTypes = {
    bookLimit: PropTypes.object,
    bookCirculation: PropTypes.object,
    title: PropTypes.object,
    books: PropTypes.array,
    members: PropTypes.array,
    bookId: PropTypes.number,
    className: PropTypes.string,
    isMemberBookHistory: PropTypes.bool,
    addBookCirculation: PropTypes.func,
    editMemberBookHistory: PropTypes.func,
    editMemberBookHistoryStatus: PropTypes.func,
    editBookCirculationStatus: PropTypes.func,
    onSelectBook: PropTypes.func,
    toggleModal: PropTypes.func,
    clearAvailableBookLimit: PropTypes.func,
    addToast: PropTypes.func,
};

const mapStateToProps = (state) => {
    return { bookLimit: state.bookLimit }
};

export default connect(mapStateToProps, {
    addBookCirculation: addBookCirculation, addToast
    , clearAvailableBookLimit
})(CreateBookCirculation);
