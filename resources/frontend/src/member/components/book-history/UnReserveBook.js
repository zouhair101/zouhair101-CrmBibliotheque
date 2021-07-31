import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import ConfirmAction from '../../../shared/action-buttons/ConfirmAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {unReserveBook} from "../../store/actions/bookHistoryAction";

const UnReserveBook = (props) => {
    const { bookHistory, unReserveBook, toggleModal } = props;
    const name = bookHistory ? bookHistory.book_item.book.name : '';
    const code = bookHistory ? bookHistory.book_item.book_code : '';
    const content = <> {getFormattedMessage('book-history.modal.message')} "{`${name} (${code})`}"</>;
    const title = getFormattedMessage('book-history.modal.title');

    const onUnReserveBook = () => {
        unReserveBook(bookHistory.book_item.id);
    };

    return <Modal {...props} actions={<ConfirmAction onConfirm={onUnReserveBook} onCancel={toggleModal}/>}
                  content={content} title={title}/>;

};

UnReserveBook.propTypes = {
    bookHistory: PropTypes.object,
    unReserveBook: PropTypes.func,
    toggleModal: PropTypes.func
};

export default connect(null, { unReserveBook })(UnReserveBook);
