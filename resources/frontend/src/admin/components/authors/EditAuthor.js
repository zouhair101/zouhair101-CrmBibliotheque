import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AuthorForm from './AuthorForm';
import Modal from '../../../shared/components/Modal';
import {editAuthor} from '../../store/actions/authorAction';

const EditAuthor = (props) => {
    const { author, editAuthor, toggleModal } = props;

    const onSaveAuthor = (formValues) => {
        editAuthor(author.id, formValues);
    };

    const prepareFormOption = {
        onSaveAuthor,
        onCancel: toggleModal,
        initialValues: {
            first_name: author.first_name,
            last_name: author.last_name,
            description: author.description
        }
    };

    return <Modal {...props} content={<AuthorForm {...prepareFormOption} />}/>
};

EditAuthor.propTypes = {
    author: PropTypes.object,
    editAuthor: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editAuthor })(EditAuthor);
