import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteGenre} from '../../store/actions/genreAction';

const DeleteGenre = (props) => {
    const { genreId, deleteGenre, toggleModal } = props;

    const onDeleteGenre = () => {
        deleteGenre(genreId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteGenre} onCancel={toggleModal}/>}/>
};

DeleteGenre.propTypes = {
    genreId: PropTypes.number,
    deleteGenre: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteGenre })(DeleteGenre);
