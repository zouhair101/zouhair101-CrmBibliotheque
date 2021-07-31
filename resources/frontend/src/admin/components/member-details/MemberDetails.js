import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import MemberBookHistory from './MemberBookHistory';
import BookHistoryModal from './MemberBookHistoryModal';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {fetchMember} from '../../store/actions/memberAction';
import {toggleModal} from '../../../store/action/modalAction';
import {Routes} from "../../../constants";
import UserDetailsCard from "../../shared/componenents/user-details-card/UserDetailsCard";

const MemberDetail = props => {
    const { member, fetchMember, match, toggleModal, history } = props;
    const [isCreate, isEdit, isDelete, bookHistory, onOpenModal] = openModal();

    useEffect(() => {
        fetchMember(+match.params.id);
    }, []);

    if (!member) {
        return <ProgressBar/>;
    }

    const onClickModal = (isEdit, bookHistory = null, isDelete = false) => {
        onOpenModal(isEdit, bookHistory, isDelete);
        toggleModal();
    };

    const onClickEditMember = (id) => {
        history.push(`${Routes.MEMBERS + id}/edit`);
    }

    const goBack = () => {
        history.goBack();
    };

    const cardBodyProps = {
        onClickModal,
        history,
        memberId: member.id
    };

    const cardModalProps = {
        bookHistory,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
        member
    };

    return (
        <div className="animated fadeIn">
            <ProgressBar/>
            <HeaderTitle title="Member Details"/>
            <Row>
                <Col sm={12} className="mb-2 d-block d-sm-flex justify-content-between">
                    <h5 className="page-heading w-100">{member.first_name + ' ' + member.last_name}</h5>
                    <div className="d-block d-sm-flex">
                        <Button className="mr-2" color="primary" onClick={() => onClickEditMember(+match.params.id)}>
                            {getFormattedMessage('members.edit-member-details.title')}
                        </Button>
                        <Button className="float-right" onClick={() => goBack()}>{getFormattedMessage('global.input.back-btn.label')}</Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <UserDetailsCard user={member} isMember/>
                                <div className="mt-5">
                                    <h5 className="mb-3">{getFormattedMessage('book-history.title')}</h5>
                                    <MemberBookHistory {...cardBodyProps}/>
                                </div>
                                <BookHistoryModal {...cardModalProps}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

MemberDetail.propTypes = {
    member: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    fetchMember: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state, ownProp) => {
    const { members } = state;
    return { member: members.find(member => member.id === +ownProp.match.params.id) }
};

export default connect(mapStateToProps, { fetchMember, toggleModal })(MemberDetail);
