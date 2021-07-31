import React from 'react';
import PropTypes from 'prop-types';
import DeleteMembershipPlan from './DeleteMembershipPlan';
import CreateMembershipPlan from './CreateMembershipPlan';
import EditMembershipPlan from './EditMembershipPlan';
import {getModalTitle} from "../../../shared/sharedMethod";
import ModalConfig from "../../../shared/modal-config/ModalConfig";

const MembershipPlanModal = (props) => {
    const { membershipPlan, currency, isCreate, isEdit, isDelete } = props;
    const addConfig = { currency };
    const editConfig = { membershipPlan, currency };
    const delConfig = { membershipPlanId: membershipPlan ? membershipPlan.id : null };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'membership-plans.input.new-btn.label',
            'membership-plans.modal.edit.title', 'membership-plans.modal.delete.title'),
        NewComponent: CreateMembershipPlan,
        EditComponent: EditMembershipPlan,
        DeleteComponent: DeleteMembershipPlan,
        deleteKey: membershipPlan ? membershipPlan.name : null,
        addConfig,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

MembershipPlanModal.propTypes = {
    membershipPlan: PropTypes.object,
    currency: PropTypes.string,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default MembershipPlanModal;
