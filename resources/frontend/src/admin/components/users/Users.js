import React from 'react';
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import UserModal from './UserModal';
import User from './UserTable';
import './Users.scss';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {openModal} from "../../../shared/custom-hooks";
import {toggleModal} from '../../../store/action/modalAction';
import {activeInactiveUser, fetchUsers} from '../../store/actions/userAction';
import {fetchRoles} from '../../store/actions/roleAction';

const Users = (props) => {
    const { users, fetchUsers, toggleModal, history, isLoading, totalRecord, activeInactiveUser } = props;
    const [isCreate, isEdit, isDelete, user, onOpenModal] = openModal();
    const cardModalProps = { user, isCreate, isEdit, isDelete, toggleModal };

    const onChangeData = (filter) => {
        fetchUsers(filter, true);
    };

    const onClickModal = (isEdit, user = null, isDelete = false) => {
        onOpenModal(isEdit, user, isDelete);
        toggleModal();
    };

    const setActiveInactive = (id, isActive) => {
        if (id) activeInactiveUser(id, isActive);
    };

    const cardBodyProps = {
        users,
        setActiveInactive,
        onClickModal,
        history,
        isLoading,
        totalRecord,
        onChangeData
    };

    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <HeaderTitle title="Users"/>
                <ProgressBar/>
                <h5 className="page-heading">{getFormattedMessage('users.title')}</h5>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => onClickModal(false)} size="md" color="primary ml-2">
                        {getFormattedMessage('users.modal.add.title')}
                    </Button>
                </div>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <User {...cardBodyProps}/>
                            <UserModal {...cardModalProps}/>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

Users.propTypes = {
    history: PropTypes.object,
    users: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchUsers: PropTypes.func,
    activeInactiveUser: PropTypes.func,
    fetchRoles: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { users, isLoading, totalRecord } = state;
    return { users, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchUsers, activeInactiveUser, fetchRoles, toggleModal })(Users);
