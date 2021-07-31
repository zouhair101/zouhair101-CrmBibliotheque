import React from 'react';
import PropTypes from 'prop-types';
import CreateGenre from './CreateGenre';
import EditGenre from './EditGenre';
import DeleteGenre from './DeleteGenre';
import ModalConfig from "../../../shared/modal-config/ModalConfig";
import {getModalTitle} from "../../../shared/sharedMethod";

export const GenreModal =  (props) => {
    const { genre, isCreate, isEdit, isDelete } = props;
    const editConfig = { genre };
    const delConfig = { genreId: genre ? genre.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'genres.input.new-btn.label',
            'genres.modal.edit.title', 'genres.modal.delete.title'),
        NewComponent: CreateGenre,
        EditComponent: EditGenre,
        DeleteComponent: DeleteGenre,
        deleteKey: genre ? genre.name : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

GenreModal.propTypes = {
    genre: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default GenreModal;
