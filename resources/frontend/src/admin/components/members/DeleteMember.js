import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteMember} from '../../store/actions/memberAction';
import {getFormattedMessage} from "../../../shared/sharedMethod";

const DeleteMember = (props) => {
    const { member, deleteMember, toggleModal } = props;
    if (!member) {
        return '';
    }
    const fullName = member.first_name + ' ' + member.last_name;
    const content = member ?
        <>{getFormattedMessage('modal.delete.message')}&nbsp;"{`${fullName}`}" ?</> : null;
    const title = getFormattedMessage('members.modal.delete.title');

    const onDeleteMember = () => {
        deleteMember(member.id);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteMember} onCancel={toggleModal}/>}
                  content={content} title={title}/>
};

DeleteMember.propTypes = {
    memberId: PropTypes.number,
    deleteMember: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteMember })(DeleteMember);
