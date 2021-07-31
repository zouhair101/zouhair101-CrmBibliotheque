import React from 'react';
import PropTypes from 'prop-types';
import CreateAuthor from './CreateAuthor';
import EditAuthor from './EditAuthor';
import DeleteAuthor from './DeleteAuthor';
import ModalConfig from '../../../shared/modal-config/ModalConfig';
import {getModalTitle} from "../../../shared/sharedMethod";

export const AuthorModal = (props) => {
    const { author, isCreate, isEdit, isDelete } = props;
    const editConfig = { author };
    const delConfig = { authorId: author ? author.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'authors.input.new-btn.label',
            'authors.modal.edit.title', 'authors.modal.delete.title'),
        NewComponent: CreateAuthor,
        EditComponent: EditAuthor,
        DeleteComponent: DeleteAuthor,
        deleteKey: author ? author.last_name ? author.first_name + ' ' + author.last_name : author.first_name : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

AuthorModal.propTypes = {
    author: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default AuthorModal;
