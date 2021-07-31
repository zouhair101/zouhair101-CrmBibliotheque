import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BookLanguageForm from './BookLanguageForm';
import Modal from '../../../shared/components/Modal';
import {addBookLanguage} from '../../store/actions/bookLanguageAction';
import {Filters} from "../../../constants";

const CreateBookLanguage = (props) => {
    const { addBookLanguage, toggleModal } = props;

    const onSaveBookLanguage = (formValues) => {
        addBookLanguage(formValues, Filters.OBJ);
    };

    const prepareFormOption = {
        onSaveBookLanguage,
        onCancel: toggleModal,
    };

    return <Modal {...props} content={<BookLanguageForm{...prepareFormOption}/>}/>
};

CreateBookLanguage.propTypes = {
    addBookLanguage: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addBookLanguage })(CreateBookLanguage);
