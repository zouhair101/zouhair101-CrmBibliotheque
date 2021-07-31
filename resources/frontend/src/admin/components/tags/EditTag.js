import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TagForm from './TagForm';
import Modal from '../../../shared/components/Modal';
import {editTag} from '../../store/actions/tagAction';

const EditTag = (props) => {
    const { tag, editTag, toggleModal } = props;

    const onSaveTag = (formValues) => {
      editTag(tag.id, formValues);
    };

    const prepareFormOption = {
        onSaveTag,
        onCancel: toggleModal,
        initialValues: {name: tag.name, description:tag.description}
    };

    return <Modal {...props} content={<TagForm {...prepareFormOption} />}/>
};

EditTag.propTypes = {
    tag: PropTypes.object,
    editTag: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, {editTag})(EditTag);
