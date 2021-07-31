import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import { addCard } from '../../store/actions/cardActions';
import CardForm from './CardForm';
import { Filters } from '../../../constants';

const CreateCard = (props) => {
    const { addCard, toggleModal } = props;

    const onSaveCard = (formValues) => {
        addCard(formValues, Filters.OBJ);
    };

    const prepareFormOption = {
        onSaveCard,
        onCancel: toggleModal,
    };

    return <Modal { ...props } content={ <CardForm{ ...prepareFormOption }/> }/>
};

CreateCard.propTypes = {
    addCard: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addCard })(CreateCard);
