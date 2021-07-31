import React from 'react';
import PropTypes from 'prop-types';
import CreatePublisher from './CreatePublisher';
import EditPublisher from './EditPublisher';
import DeletePublisher from './DeletePublisher';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

const PublisherModal = (props) => {
    const { publisher, isCreate, isEdit, isDelete } = props;
    const editConfig = { publisher };
    const delConfig = { publisherId: publisher ? publisher.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'publishers.input.new-btn.label',
            'publishers.modal.edit.title', 'publishers.modal.delete.title'),
        NewComponent: CreatePublisher,
        EditComponent: EditPublisher,
        DeleteComponent: DeletePublisher,
        deleteKey: publisher ? publisher.name : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

PublisherModal.propTypes = {
    publisher: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default PublisherModal;
