import React from 'react';
import PropTypes from 'prop-types';
import CreateTag from './CreateTag';
import EditTag from './EditTag';
import DeleteTag from './DeleteTag';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

export const TagModal = (props) => {
    const { tag, isCreate, isEdit, isDelete } = props;
    const editConfig = { tag };
    const delConfig = { tagId: tag ? tag.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'tags.input.new-btn.label',
            'tags.modal.edit.title', 'tags.modal.delete.title'),
        NewComponent: CreateTag,
        EditComponent: EditTag,
        DeleteComponent: DeleteTag,
        deleteKey: tag ? tag.name : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

TagModal.propTypes = {
    tag: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default TagModal;
