import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ImportBookForm from './ImportBookForm';
import {getFormattedMessage} from "../../../shared/sharedMethod";

const ImportBook = (props) => {
    const { toggleImportBookModal, isImportBookModal, fetchBooks, onSaveImportData } = props;

    const onSaveImportFile = (data) => {
        onSaveImportData(data);
    }

    const prepareFormOption = {
        onSaveImportData: onSaveImportFile
    }

    return (
        <Modal isOpen={isImportBookModal} toggle={toggleImportBookModal}
            className={'modal-primary modal-config--small'}>
            <ModalHeader toggle={toggleImportBookModal}>
                {getFormattedMessage('books.input.import-file.warning-start.label')}
            </ModalHeader>
            <ModalBody>
                <ImportBookForm {...prepareFormOption} />
            </ModalBody>
        </Modal>
    );
};

ImportBook.propTypes = {
    toggleImportBookModal: PropTypes.func,
    onSaveImportData: PropTypes.func
};

const mapStateToProps = (state) => {
    const { isImportBookModal } = state;
    return {
        isImportBookModal: state.isImportBookModal
    }
};

export default connect(mapStateToProps)(ImportBook);
