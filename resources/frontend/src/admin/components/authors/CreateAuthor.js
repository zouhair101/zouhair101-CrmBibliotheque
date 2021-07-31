import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AuthorForm from './AuthorForm';
import Modal from '../../../shared/components/Modal';
import {addAuthor} from '../../store/actions/authorAction';
import {Filters} from "../../../constants";

const CreateAuthor = (props) => {
    const { addAuthor, toggleModal } = props;

    const onSaveAuthor = (formValues) => {
        addAuthor(formValues, Filters.OBJ);
    };

    const prepareFormOption = {
        onSaveAuthor,
        onCancel: toggleModal,
    };

    return <Modal {...props} content={<AuthorForm{...prepareFormOption}/>}/>
};

CreateAuthor.propTypes = {
    addAuthor: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addAuthor })(CreateAuthor);
