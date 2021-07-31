import React from 'react';
import {Table} from 'reactstrap';
import PropTypes from 'prop-types';
import {sortConfig} from '../../../config/sortConfig';
import {membershipPlanFrequency, membershipPlanFrequencyOptions} from '../../constants';
import TableHeader from '../../../shared/table-header/Tableheader';
import ModalAction from '../../../shared/action-buttons/ModalAction';
import {getFormattedMessage, getFormattedOptions} from "../../../shared/sharedMethod";

export const MembershipPlanTable = (props) => {
    const { membershipPlans, onClickModal, sortAction, sortObject, currency } = props;
    const membershipFrequencyOptions = getFormattedOptions(membershipPlanFrequencyOptions);
    const headers = [
        { id: 'name', name: getFormattedMessage('react-data-table.name.column') },
        { id: 'frequency_name', name: getFormattedMessage('membership-plans.select.frequency.label') },
        { id: 'price', name: getFormattedMessage('membership-plans.input.price.label') }
    ];
    const headerProps = { sortAction, sortObject, sortConfig, headers };
    const renderMemberShipPlanFrequency = (membershipPlan) => {
        switch (membershipPlan.frequency) {
            case membershipPlanFrequency.MONTHLY:
                membershipPlan.frequency_name = 'Monthly';
                return membershipFrequencyOptions[0].name;
            default :
                membershipPlan.frequency_name = 'Yearly';
                return membershipFrequencyOptions[1].name;
        }
    };
    return (
        <div className="overflow-auto">
            <Table hover bordered striped responsive size="md">
                <thead>
                    <TableHeader{...headerProps}/>
                </thead>
                <tbody>
                    {membershipPlans.map((membershipPlan) => {
                        return (
                            <tr key={membershipPlan.id.toString()}>
                                <td>{membershipPlan.name}</td>
                                <td>{renderMemberShipPlanFrequency(membershipPlan)}</td>
                                <td className="text-right">{currency}{membershipPlan.price}</td>
                                <td className="text-center">
                                    <ModalAction onOpenModal={onClickModal} item={membershipPlan}/>
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </Table>
        </div>
    );
};

MembershipPlanTable.propTypes = {
    sortObject: PropTypes.object,
    currency: PropTypes.string,
    membershipPlans: PropTypes.array,
    sortAction: PropTypes.func,
    onClickModal: PropTypes.func,
};

export default MembershipPlanTable;
