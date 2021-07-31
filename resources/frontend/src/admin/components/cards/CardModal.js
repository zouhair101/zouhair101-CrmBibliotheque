import React from 'react';
import PropTypes from 'prop-types';
import CreateCard from './CreateCard';
import EditCard from './EditCard';
import DeleteCard from './DeleteCard';
import ModalConfig from '../../../shared/modal-config/ModalConfig';
import { getModalTitle } from "../../../shared/sharedMethod";

const CardModal = (props) => {
    const { card, isCreate, isEdit, isDelete } = props;
    const editConfig = { card };
    const delConfig = { cardId: card ? card.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'about-us-card.input.new-btn.label',
            'about-us-card.modal.edit.title', 'about-us-card.modal.delete.title'),
        NewComponent: CreateCard,
        EditComponent: EditCard,
        DeleteComponent: DeleteCard,
        deleteKey: card ? card.title : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig { ...modalOptions }/>;
};

CardModal.propTypes = {
    card: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default CardModal;
