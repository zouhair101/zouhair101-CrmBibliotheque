import React from 'react';
import PropTypes from 'prop-types';
import CreateBookLanguage from './CreateBookLanguage';
import EditBookLanguage from './EditBookLanguage';
import DeleteBookLanguage from './DeleteBookLanguage';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

export const BookLanguageModal = (props) => {
    const { bookLanguage, isCreate, isEdit, isDelete } = props;
    const editConfig = { bookLanguage };
    const delConfig = { bookLanguageId: bookLanguage ? bookLanguage.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'book-languages.input.new-btn.label',
            'book-languages.modal.edit.title', 'book-languages.modal.delete.title'),
        NewComponent: CreateBookLanguage,
        EditComponent: EditBookLanguage,
        DeleteComponent: DeleteBookLanguage,
        deleteKey: bookLanguage ? bookLanguage.language_name : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};


BookLanguageModal.propTypes = {
    bookLanguage: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default BookLanguageModal;
