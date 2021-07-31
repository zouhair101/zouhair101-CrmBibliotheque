import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardForm from './CardForm';
import Modal from '../../../shared/components/Modal';
import { editCard } from '../../store/actions/cardActions';

const EditCard = (props) => {
    const { card, editCard, toggleModal } = props;

    const onSaveCard = (formValues) => {
        editCard(card.id, formValues);
    };

    const prepareFormOption = {
        onSaveCard,
        onCancel: toggleModal,
        initialValues: {
            title: card.title,
            description: card.description,
            is_active: card.is_active
        }
    };

    return <Modal { ...props } content={ <CardForm { ...prepareFormOption } /> }/>
};

EditCard.propTypes = {
    genre: PropTypes.object,
    editCard: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editCard })(EditCard);
