import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardBody} from 'reactstrap';
import PropTypes from 'prop-types';
import prepareFormData from './prepareFormData';
import MemberProfileForm from './MemberProfileForm';
import './MemberProfile.scss';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage, prepareProfileData} from "../../../shared/sharedMethod";
import {fetchMember, editMember} from '../../store/actions/memberAction';
import {fetchCountries} from '../../store/actions/countryAction';

const MemberProfile = props => {
    const { countries, member, history, fetchMember, fetchCountries, editMember } = props;

    useEffect(() => {
        fetchMember();
        fetchCountries();
    }, []);

    const onSaveMemberProfile = (formValues) => {
        editMember(prepareFormData(formValues), history);
    };

    const prepareFormOption = {
        initialValues: prepareProfileData(member),
        countries,
        history,
        onSaveMemberProfile
    };

    if (!member || !member.id) {
        return <ProgressBar/>;
    }

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
                                    <MemberProfileForm {...prepareFormOption}/>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

MemberProfile.propTypes = {
    member: PropTypes.object,
    history: PropTypes.object,
    countries: PropTypes.array,
    fetchMember: PropTypes.func,
    fetchCountries: PropTypes.func,
    editMember: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { member, countries } = state;
    return { member, countries }
};
export default connect(mapStateToProps, { fetchMember, fetchCountries, editMember })(MemberProfile);
