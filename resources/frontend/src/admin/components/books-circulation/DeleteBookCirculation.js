import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteBookCirculation} from '../../store/actions/bookCirculationAction';
import {Filters} from "../../../constants";

const DeleteBookCirculation = (props) => {
    const { bookCirculationId, deleteBookCirculation, toggleModal } = props;

    const onDeleteBookCirculation = () => {
        deleteBookCirculation(bookCirculationId, Filters.OBJ);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteBookCirculation} onCancel={toggleModal}/>}/>
};

DeleteBookCirculation.propTypes = {
    bookCirculationId: PropTypes.number,
    deleteBookCirculation: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteBookCirculation: deleteBookCirculation })(DeleteBookCirculation);
