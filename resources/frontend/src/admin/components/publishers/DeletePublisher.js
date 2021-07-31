import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deletePublisher} from '../../store/actions/publisherAction';

const DeletePublisher = (props) => {
    const { publisherId, deletePublisher, toggleModal } = props;

    const onDeletePublisher = () => {
        deletePublisher(publisherId);
    };
    return <Modal {...props} actions={<DeleteAction onDelete={onDeletePublisher} onCancel={toggleModal}/>}/>
};

DeletePublisher.propTypes = {
    publisherId: PropTypes.number,
    deletePublisher: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deletePublisher })(DeletePublisher);
