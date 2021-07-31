import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteAuthor} from '../../store/actions/authorAction';

const DeleteAuthor = (props) => {
    const { authorId, deleteAuthor, toggleModal } = props;

    const onDeleteAuthor = () => {
        deleteAuthor(authorId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteAuthor} onCancel={toggleModal}/>}/>
};

DeleteAuthor.propTypes = {
    authorId: PropTypes.number,
    deleteAuthor: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteAuthor })(DeleteAuthor);
