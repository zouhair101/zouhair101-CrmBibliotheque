import React from 'react';
import PropTypes from 'prop-types';
import EditBookCirculation from '../books-circulation/EditBookCirculation';
import EditMember from '../members/EditMember';
import DeleteBookCirculation from '../books-circulation/DeleteBookCirculation';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

export const MemberBookHistoryModal =  (props) => {
    const { bookHistory, isCreate, isEdit, isDelete, member } = props;
    const addConfig = { member };
    const editConfig = { bookCirculation: bookHistory, isMemberBookHistory: true };
    const delConfig = { bookCirculationId: bookHistory ? bookHistory.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'members.edit-member-details.title',
            'books-circulation.modal.edit.title', 'books-circulation.modal.delete.title'),
        NewComponent: EditMember,
        EditComponent: EditBookCirculation,
        DeleteComponent: DeleteBookCirculation,
        deleteKey: member ? member.first_name + ' ' + member.last_name : null,
        addConfig,
        editConfig,
        delConfig,
        isWide: isCreate ? isCreate : null,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

MemberBookHistoryModal.propTypes = {
    bookHistory: PropTypes.object,
    member: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default MemberBookHistoryModal;
