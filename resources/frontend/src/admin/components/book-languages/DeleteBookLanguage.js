import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteBookLanguage} from '../../store/actions/bookLanguageAction';

const DeleteBookLanguage = (props) => {
    const { bookLanguageId, deleteBookLanguage, toggleModal } = props;

    const onDeleteLanguage = () => {
        deleteBookLanguage(bookLanguageId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteLanguage} onCancel={toggleModal}/>}/>
};

DeleteBookLanguage.propTypes = {
    bookLanguageId: PropTypes.number,
    deleteBookLanguage: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteBookLanguage })(DeleteBookLanguage);
