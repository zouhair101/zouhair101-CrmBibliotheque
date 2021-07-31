import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteTag} from '../../store/actions/tagAction';

const DeleteTag = (props) => {
    const { tagId, deleteTag, toggleModal } = props;

    const onDeleteTag = () => {
        deleteTag(tagId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteTag} onCancel={toggleModal}/>}/>
};

DeleteTag.propTypes = {
    tagId: PropTypes.number,
    deleteTag: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteTag })(DeleteTag);
