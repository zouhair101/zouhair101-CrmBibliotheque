import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import {getFormattedMessage, getDynamicFormattedMessage, priceFormatter} from "../../../shared/sharedMethod";
import {reduxForm} from 'redux-form';
import '../../../shared/action-buttons/ActionButtons.scss';

const PenaltyWarningModal = (props) => {
    const { lateDays, collectedPenalty, isReturnDueDateModal, toggleDueBookModal, currency } = props;

    const renderMessage = () => {
        const amount = priceFormatter(collectedPenalty, currency);
        return getDynamicFormattedMessage('books-circulation.penalties.customer-return-book.message', {
            lateDays: lateDays,
            amount: amount
        });
    };

    return (
        <Modal isOpen={isReturnDueDateModal} toggle={toggleDueBookModal}
            className={'modal-primary modal-config--small'}>
            <ModalHeader toggle={toggleDueBookModal}>
                {getFormattedMessage('books-circulation.return.modal.penalties-warning.label')}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs={12}>
                        {renderMessage()}
                    </Col>
                    <Col xs={12}>
                        <Button onClick={toggleDueBookModal} color="primary" size="md" className="save-action__save-btn">
                            {getFormattedMessage('global.input.ok-btn.label')}
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    const { isReturnDueDateModal, settings } = state;
    return {
        currency: settings.currency.value.toLowerCase(),
        isReturnDueDateModal
    }
};

const penaltyWarningModal = reduxForm({
    form: 'penaltiesWarningForms'
})(PenaltyWarningModal);

export default connect(mapStateToProps)(penaltyWarningModal);
