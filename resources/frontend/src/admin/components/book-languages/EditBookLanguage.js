import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import {editBookLanguage} from '../../store/actions/bookLanguageAction';
import BookLanguageForm from './BookLanguageForm';

const EditBookLanguage = (props) => {
    const { bookLanguage, editBookLanguage, toggleModal } = props;

    const onSaveBookLanguage = (formValues) => {
        editBookLanguage(bookLanguage.id, formValues);
    };

    const prepareFormOption = {
        onSaveBookLanguage,
        onCancel: toggleModal,
        initialValues: { language_name: bookLanguage.language_name, language_code: bookLanguage.language_code }
    };

    return <Modal {...props} content={<BookLanguageForm {...prepareFormOption} />}/>
};


EditBookLanguage.propTypes = {
    bookLanguage: PropTypes.object,
    editBookLanguage: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editBookLanguage })(EditBookLanguage);
