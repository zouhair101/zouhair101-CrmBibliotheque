import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TagForm from './TagForm';
import Modal from '../../../shared/components/Modal';
import {addTag} from '../../store/actions/tagAction';
import {Filters} from "../../../constants";

const CreateTag = (props) => {
    const { addTag, toggleModal } = props;

    const onSaveTag = (formValues) => {
        addTag(formValues, Filters.OBJ);
    };
    const prepareFormOption = {
        onSaveTag,
        onCancel: toggleModal,
    };
    return <Modal {...props} content={<TagForm{...prepareFormOption}/>}/>
};

CreateTag.propTypes = {
    addTag: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addTag })(CreateTag);
