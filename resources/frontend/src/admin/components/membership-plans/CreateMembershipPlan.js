import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MembershipPlanForm from './MembershipPlanForm';
import Modal from '../../../shared/components/Modal';
import {addMembershipPlan} from '../../store/actions/membershipPlanAction';

const CreateMembershipPlan = (props) => {
    const { currency, addMembershipPlan, toggleModal } = props;

    const onSaveMembershipPlan = (formValues) => {
        addMembershipPlan(formValues);
    };

    const prepareFormOption = {
        onSaveMembershipPlan,
        onCancel: toggleModal,
        currency
    };

    return <Modal {...props} content={<MembershipPlanForm{...prepareFormOption}/>}/>
};

CreateMembershipPlan.propTypes = {
    currency: PropTypes.string,
    addMembershipPlan: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addMembershipPlan })(CreateMembershipPlan);
