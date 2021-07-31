import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import {addGenre} from '../../store/actions/genreAction';
import GenreForm from './GenreForm';
import {Filters} from "../../../constants";

const CreateGenre = (props) => {
    const { addGenre, toggleModal } = props;

    const onSaveGenre = (formValues) => {
        addGenre(formValues, Filters.OBJ);
    };

    const prepareFormOption = {
        onSaveGenre,
        onCancel: toggleModal,
    };

    return <Modal {...props} content={<GenreForm{...prepareFormOption}/>}/>
};

CreateGenre.propTypes = {
    addGenre: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addGenre })(CreateGenre);
