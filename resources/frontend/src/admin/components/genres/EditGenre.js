import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import GenreForm from './GenreForm';
import Modal from '../../../shared/components/Modal';
import {editGenre} from '../../store/actions/genreAction';

const EditGenre = (props) => {
    const { genre, editGenre, toggleModal } = props;

    const onSaveGenre = (formValues) => {
        editGenre(genre.id, formValues);
    };

    const prepareFormOption = {
        onSaveGenre,
        onCancel: toggleModal,
        initialValues: { name: genre.name, description: genre.description, is_featured: genre.show_on_landing_page }
    };

    return <Modal {...props} content={<GenreForm {...prepareFormOption} />}/>
};

EditGenre.propTypes = {
    genre: PropTypes.object,
    editGenre: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editGenre })(EditGenre);
