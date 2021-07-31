import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {deleteBookSeries} from '../../store/actions/bookSeriesAction';

const DeleteBookSeries = (props) => {
    const { bookSeries, deleteBookSeries, toggleModal } = props;
    const content = props.bookSeries ?
        <>{getFormattedMessage('modal.delete.message')}&nbsp;"{`${bookSeries.title}`}" ?</> : null;
    const title = getFormattedMessage('books-series.modal.delete.title');

    const onDeleteBookSeries = () => {
        deleteBookSeries(bookSeries.id);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookSeries} onCancel={toggleModal}/>}
                  content={content} title={title}/>;
};

DeleteBookSeries.propTypes = {
    bookSeries: PropTypes.object,
    deleteBookSeries: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteBookSeries })(DeleteBookSeries);
