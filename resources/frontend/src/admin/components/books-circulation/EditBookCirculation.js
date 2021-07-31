import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import BookCirculationForm from './BookCirculationForm';
import {dateFormat} from "../../../constants";
import {bookCirculationStatusConstant, bookStatusOptions} from '../../constants';
import Modal from '../../../shared/components/Modal';
import {editBookCirculation, editBookCirculationStatus} from '../../store/actions/bookCirculationAction';
import {editMemberBookHistory, editMemberBookHistoryStatus} from '../../store/actions/memberBookHistoryAction';
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";
import {addToast} from "../../../store/action/toastAction";
import {clearAvailableBookLimit} from "../../store/actions/availableBookLimitAction";
import {toastType} from "../../../member/constants";

const EditBookCirculation = (props) => {
    const {
        toggleModal, className, editBookCirculationStatus, editBookCirculation,
        editMemberBookHistoryStatus, editMemberBookHistory,
        title, bookCirculation, onSelectBook, bookId, isMemberBookHistory, filterObject,
        addToast, bookLimit, clearAvailableBookLimit
    } = props;
    const [isDisableSubmit, setDisableSubmit] = useState(false);
    const modalOption = { toggleModal, className, title };
    const formOption = { onSelectBook, bookId };
    const bookCirculationStatusOptions = getFormattedOptions(bookStatusOptions);
    const { note, reserve_date, issued_on, return_date, member, return_due_date } = bookCirculation;
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

    const changeAbleFields = {
        book: bookCirculation.book_item.book,
        note,
        reserve_date: reserve_date ? moment(reserve_date, dateFormat.DEFAULT_MOMENT).format(dateFormat.NATIVE) : '',
        issued_on: issued_on ? moment(issued_on, dateFormat.DEFAULT_MOMENT).format(dateFormat.NATIVE) : '',
        return_date: return_date ? moment(return_date, dateFormat.DEFAULT_MOMENT).format(dateFormat.NATIVE) : '',
        book_item: {
            id: bookCirculation.book_item.id,
            name: bookCirculation.book_item.edition + ` (${bookCirculation.book_item.book_code})`
        },
        member: member ? { id: member.id, name: member.first_name + ' ' + member.last_name } : null,
        return_due_date: return_due_date,
        status: bookCirculationStatusOptions.find(bookCirculationStatus => bookCirculationStatus.id === +bookCirculation.status),
        penalty_collected: false,
        collected_penalty: 0
    };

    const onSaveBookCirculation = (formValues) => {
        if (!isMemberBookHistory) {
            switch (formValues.status) {
                case bookCirculationStatusConstant.BOOK_LOST:
                case bookCirculationStatusConstant.BOOK_DAMAGED:
                    editBookCirculationStatus(formValues, filterObject);
                    break;
                default:
                    editBookCirculation(formValues, filterObject);
                    break;
            }
        } else {
            switch (formValues.status) {
                case bookCirculationStatusConstant.BOOK_LOST:
                case bookCirculationStatusConstant.BOOK_DAMAGED:
                    editMemberBookHistoryStatus(formValues);
                    break;
                default:
                    editMemberBookHistory(formValues);
                    break;
            }
        }
        clearAvailableBookLimit();
    };

    const onCancel = () => {
        clearAvailableBookLimit();
        toggleModal();
    };

    const prepareFormOption = {
        onSaveBookCirculation,
        onCancel,
        initialValues: changeAbleFields,
        isDisableSubmit
    };

    return <Modal {...modalOption} content={<BookCirculationForm {...prepareFormOption} {...formOption} />}/>
};

EditBookCirculation.propTypes = {
    bookLimit: PropTypes.object,
    bookCirculation: PropTypes.object,
    filterObject: PropTypes.object,
    title: PropTypes.object,
    books: PropTypes.array,
    members: PropTypes.array,
    bookId: PropTypes.number,
    className: PropTypes.string,
    isMemberBookHistory: PropTypes.bool,
    editBookCirculation: PropTypes.func,
    editMemberBookHistory: PropTypes.func,
    editMemberBookHistoryStatus: PropTypes.func,
    editBookCirculationStatus: PropTypes.func,
    fetchBooks: PropTypes.func,
    fetchMembers: PropTypes.func,
    onSelectBook: PropTypes.func,
    toggleModal: PropTypes.func,
    clearAvailableBookLimit: PropTypes.func,
    addToast: PropTypes.func,
};

const mapStateToProps = (state) => {
    return { bookLimit: state.bookLimit }
};

export default connect(mapStateToProps, {
    editBookCirculation: editBookCirculation,
    editMemberBookHistory,
    editMemberBookHistoryStatus,
    editBookCirculationStatus: editBookCirculationStatus,
    clearAvailableBookLimit,
    addToast
})(EditBookCirculation);
