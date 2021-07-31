import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import { connect } from 'react-redux';
import { deleteCard } from '../../store/actions/cardActions';
import { Filters } from '../../../constants';

const DeleteCard = (props) => {
    const { cardId, deleteCard, toggleModal } = props;

    const onDeleteCard = () => {
        deleteCard(cardId, Filters.OBJ);
    };

    return <Modal { ...props } actions={ <DeleteAction onDelete={ onDeleteCard } onCancel={ toggleModal }/> }/>
};

DeleteCard.propTypes = {
    cardId: PropTypes.number,
    deleteCard: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteCard })(DeleteCard);
