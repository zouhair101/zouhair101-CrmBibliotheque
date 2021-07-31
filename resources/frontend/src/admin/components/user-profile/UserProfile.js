import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import PropTypes from 'prop-types';
import './UserProfile.scss';
import UserProfileForm from './UserProfileForm';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import prepareUserFormData from "../../shared/prepareUserFormData";
import {getFormattedMessage, prepareProfileData} from "../../../shared/sharedMethod";
import {fetchUserProfile, editUserProfile} from '../../store/actions/userProfileAction';
import {fetchCountries} from '../../store/actions/countryAction';

const UserProfile = props => {
    const {
        countries, userProfile, fetchUserProfile, fetchCountries, editUserProfile, history
    } = props;

    useEffect(() => {
        fetchUserProfile();
        fetchCountries();
    }, []);

    const onSaveProfile = (formValues) => {
        editUserProfile(prepareUserFormData(formValues), history);
    };

    if (!userProfile || !userProfile.id) {
        return <ProgressBar/>;
    }

    const prepareFormOption = {
        initialValues: prepareProfileData(userProfile),
        countries,
        onSaveProfile,
        history
    };

    return (
        <div className="animated fadeIn">
            <HeaderTitle title="Profile"/>
            <Row>
                <Col sm={12} className="mb-2 d-flex justify-content-between">
                    <h5 className="pull-left text-dark">{getFormattedMessage('profile.title')}</h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <Row>
                                    <UserProfileForm {...prepareFormOption}/>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

UserProfile.propTypes = {
    userProfile: PropTypes.object,
    history: PropTypes.object,
    countries: PropTypes.array,
    fetchUserProfile: PropTypes.func,
    fetchCountries: PropTypes.func,
    editUserProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { userProfile, countries } = state;
    return { userProfile, countries }
};
export default connect(mapStateToProps, { fetchUserProfile, fetchCountries, editUserProfile })(UserProfile);
