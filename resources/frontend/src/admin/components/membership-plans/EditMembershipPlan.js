import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MembershipPlanForm from './MembershipPlanForm';
import {membershipPlanFrequencyOptions} from '../../constants';
import Modal from '../../../shared/components/Modal';
import {getFormattedOptions} from "../../../shared/sharedMethod";
import {editMembershipPlan} from '../../store/actions/membershipPlanAction';

const EditMembershipPlan = (props) => {
    const { membershipPlan, currency, editMembershipPlan, toggleModal } = props;
    const { name, membership_plan_id, price, frequency, stripe_plan_id, description } = membershipPlan;
    const membershipFrequencyOptions = getFormattedOptions(membershipPlanFrequencyOptions);
    const changeAbleFields = {
        name, membership_plan_id, price, stripe_plan_id, description,
        frequency: membershipFrequencyOptions.find(option => option.id === frequency)
    };

    const onSaveMembershipPlan = (formValues) => {
        editMembershipPlan(props.membershipPlan.id, formValues);
    };

    const prepareFormOption = {
        onSaveMembershipPlan,
        onCancel: toggleModal,
        initialValues: changeAbleFields,
        currency: currency
    };

    return <Modal {...props} content={<MembershipPlanForm {...prepareFormOption} />}/>
};

EditMembershipPlan.propTypes = {
    membershipPlan: PropTypes.object,
    currency: PropTypes.string,
    editMembershipPlan: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editMembershipPlan })(EditMembershipPlan);
