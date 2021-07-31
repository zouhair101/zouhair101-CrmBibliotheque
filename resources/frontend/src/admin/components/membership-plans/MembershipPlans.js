import React, {useEffect} from 'react';
import {Row, Col, Button, Card, CardBody} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MembershipPlanModal from './MembershipPlanModal';
import MembershipPlan from './MembershipPlanTable';
import EmptyComponent from '../../../shared/empty-component/EmptyComponent';
import CustomSearchField from '../../../shared/components/CustomSearchField';
import searchFilter from '../../../shared/searchFilter';
import sortFilter from '../../../shared/sortFilter';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {fetchMembershipPlans} from '../../store/actions/membershipPlanAction';
import {toggleModal} from '../../../store/action/modalAction';
import {sortAction} from '../../../store/action/sortAction';
import {icon} from "../../../constants";

const MembershipPlans = (props) => {
    const {
        membershipPlans, sortAction, sortObject, toggleModal, currency,
        fetchMembershipPlans, searchText
    } = props;
    const [isCreate, isEdit, isDelete, membershipPlan, onOpenModal] = openModal();
    const cardModalProps = { membershipPlan, isCreate, isEdit, isDelete, toggleModal, currency };

    useEffect(() => {
        fetchMembershipPlans(true);
    }, []);

    const onClickModal = (isEdit, membershipPlan = null, isDelete = false) => {
        onOpenModal(isEdit, membershipPlan, isDelete);
        toggleModal();
    };

    const cardBodyProps = { sortAction, sortObject, membershipPlans, onClickModal, currency };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Membership Plans"/>
                <h5 className="page-heading">{getFormattedMessage('membership-plans.title')}</h5>
                <div className="float-right">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary">
                        {getFormattedMessage('membership-plans.input.new-btn.label')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-end mb-2">
                                {membershipPlans.length > 0 || searchText ? <CustomSearchField/> : null }
                            </div>
                            {membershipPlans.length > 0 ? <MembershipPlan {...cardBodyProps}/> :
                                <EmptyComponent title={searchText ? getFormattedMessage('membership-plans.not-found.empty-state.title') :
                                   getFormattedMessage('membership-plans.empty-state.title')} icon={(icon.MEMBER_PLAN)}/>}
                            <MembershipPlanModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

MembershipPlans.propTypes = {
    sortObject: PropTypes.object,
    currency: PropTypes.string,
    membershipPlans: PropTypes.array,
    searchText: PropTypes.string,
    fetchMembershipPlans: PropTypes.func,
    sortAction: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { membershipPlans, searchText, sortObject, currency } = state;
    let membershipPlansArray = Object.values(membershipPlans);
    if (searchText) {
        const filterKeys = ['name', 'price', 'frequency_name'];
        membershipPlansArray = searchFilter(membershipPlansArray, searchText, filterKeys);
    }
    if (sortObject) {
        membershipPlansArray = sortFilter(membershipPlansArray, sortObject);
    }
    return { membershipPlans: membershipPlansArray, sortObject, currency, searchText };
};

export default connect(mapStateToProps, { fetchMembershipPlans, sortAction, toggleModal })(MembershipPlans);
