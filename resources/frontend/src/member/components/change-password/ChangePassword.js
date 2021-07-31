import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {onChangePassword} from '../../store/actions/changePasswordAction';
import ChangePasswordForm from "./ChangePasswordForm";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

const ChangePassword = (props) => {
    const { onChangePassword, toggleChangePasswordModal, isChangePasswordModelToggle } = props;

    const onSaveChangePassword = (formValues) => {
        onChangePassword(formValues);
    };

    const prepareFormOption = {
        onSaveChangePassword,
        onCancel: toggleChangePasswordModal,
    };

    return (
        <Modal isOpen={isChangePasswordModelToggle} toggle={toggleChangePasswordModal}
               className={'modal-primary primary modal-config--small'}>
            <ModalHeader
                toggle={toggleChangePasswordModal}>{getFormattedMessage('change-password.model.header-title')}</ModalHeader>
            <ModalBody>
                <ChangePasswordForm{...prepareFormOption}/>
            </ModalBody>
        </Modal>
    );
};

const mapStateToProps = state => {
    return { isChangePasswordModelToggle: state.isChangePasswordModelToggle };
};

ChangePassword.propTypes = {
    onChangePassword: PropTypes.func,
    toggleChangePasswordModal: PropTypes.func
};

export default connect(mapStateToProps, { onChangePassword })(ChangePassword);
