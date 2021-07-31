import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PublisherForm from './PublisherForm';
import Modal from '../../../shared/components/Modal';
import {editPublisher} from '../../store/actions/publisherAction';

const EditPublisher = (props) => {
    const { publisher, editPublisher, toggleModal } = props;

    const onSavePublisher = (formValues) => {
        editPublisher(publisher.id, formValues);
    };

    const prepareFormOption = {
        onSavePublisher,
        onCancel: toggleModal,
        initialValues: { name: publisher.name, description: publisher.description }
    };

    return <Modal {...props} content={<PublisherForm {...prepareFormOption} />}/>
};

EditPublisher.propTypes = {
    publisher: PropTypes.object,
    editPublisher: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editPublisher })(EditPublisher);
