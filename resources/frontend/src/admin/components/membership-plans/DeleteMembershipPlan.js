import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../../shared/components/Modal';
import DeleteAction from '../../../shared/action-buttons/DeleteAction';
import {deleteMembershipPlan} from '../../store/actions/membershipPlanAction';

const DeleteMembershipPlan = (props) => {
    const { membershipPlanId, deleteMembershipPlan, toggleModal } = props;

    const onDeleteMembershipPlan = () => {
        deleteMembershipPlan(membershipPlanId);
    };

    return <Modal {...props} actions={<DeleteAction onDelete={onDeleteMembershipPlan} onCancel={toggleModal}/>}/>
};

DeleteMembershipPlan.propTypes = {
    membershipPlanId: PropTypes.number,
    deleteMembershipPlan: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteMembershipPlan })(DeleteMembershipPlan);
