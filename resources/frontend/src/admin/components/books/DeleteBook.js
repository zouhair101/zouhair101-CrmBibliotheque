import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import Modal from '../../../shared/components/Modal';
import {deleteBook} from '../../store/actions/bookAction';
import {Filters} from "../../../constants";

const DeleteBook = (props) => {
    const { book, deleteBook, toggleModal } = props;
    const content = book ?
        <>{getFormattedMessage('modal.delete.message')}&nbsp;"{`${book.name}`}" ?</> : null;
    const title = getFormattedMessage('books.modal.delete.title');

    const onDeleteBook = () => {
        deleteBook(props.book.id, Filters.OBJ);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBook} onCancel={toggleModal}/>} content={content}
                  title={title}/>;

};

DeleteBook.propTypes = {
    book: PropTypes.object,
    deleteBook: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteBook })(DeleteBook);
