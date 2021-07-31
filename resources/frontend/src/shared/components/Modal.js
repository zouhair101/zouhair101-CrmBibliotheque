import React from 'react';
import PropTypes from 'prop-types';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';

const GlobalModal = (props) => {
    const { className, isToggle, toggleModal, actions, title, content } = props;
    const modalClassName = `modal-primary primary ${className}`;
    return (
        <Modal isOpen={isToggle} toggle={toggleModal} centered={!!actions} className={modalClassName}>
            <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
            <ModalBody>
                {content}
            </ModalBody>
            {actions ? <ModalFooter>{actions}</ModalFooter> : null}
        </Modal>
    );
};

const mapStateToProps = state => {
    return { isToggle: state.isToggle };
};

GlobalModal.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    actions: PropTypes.element,
    content: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
    ]),
    className: PropTypes.string,
    isToggle: PropTypes.bool,
    toggleModal: PropTypes.func
};

export default connect(mapStateToProps)(GlobalModal);
