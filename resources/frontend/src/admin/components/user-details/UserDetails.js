import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, CardBody, Row, Col, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import UserDetailsModal from './UserDetailsModal';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import UserDetailsCard from '../../shared/componenents/user-details-card/UserDetailsCard';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {fetchUser} from '../../store/actions/userAction';
import {toggleModal} from "../../../store/action/modalAction";

const UserDetails = props => {
    const { user, history, fetchUser, toggleModal, match } = props;
    const [isToggle, setIsToggle] = useState(false);

    useEffect(() => {
        fetchUser(+match.params.id);
    }, []);

    if (!user) {
        return <ProgressBar/>;
    }

    const onOpenModal = () => {
        setIsToggle(true);
        toggleModal();
    };
    const goBack = () => {
        history.goBack();
    };

    return (
        <div className="animated fadeIn">
            <HeaderTitle title="User Details"/>
            <Row>
                <Col sm={12} className="mb-2 d-block d-sm-flex justify-content-between">
                    <h5 className="page-heading w-100">{user.first_name + ' ' + user.last_name}</h5>
                    <div className="d-block d-sm-flex">
                        <Button className="mr-2" color="primary" onClick={() => onOpenModal()}>
                            {getFormattedMessage('users.edit-user-details.title')}
                        </Button>
                        <Button className="float-right" onClick={() => goBack()}>{getFormattedMessage('global.input.back-btn.label')}</Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <UserDetailsCard user={user}/>
                                <UserDetailsModal user={user} isEditMode={isToggle} toggleModal={toggleModal}/>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

UserDetails.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    fetchUser: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state, ownProp) => {
    const { users } = state;
    return {
        user: users.find(user => user.id === +ownProp.match.params.id)
    }
};

export default connect(mapStateToProps, { fetchUser, toggleModal })(UserDetails);
