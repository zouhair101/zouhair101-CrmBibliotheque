import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MemberForm from './MemberForm';
import prepareFormData from '../../shared/prepareUserFormData';
import {editMember, fetchMember} from '../../store/actions/memberAction';
import {getFormattedMessage, prepareProfileData} from "../../../shared/sharedMethod";
import {Card, CardBody, Col, Row} from "reactstrap";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";

const EditMember = (props) => {
    const { member, match, editMember, history, fetchMember, isLoading } = props;

    useEffect(() => {
        fetchMember(+match.params.id, true);
    }, []);

    if (!member) {
        return <ProgressBar/>;
    }

    const onSaveMember = (formValues) => {
        formValues.roles = [];
        editMember(member.id, prepareFormData(formValues), history);
    };

    const goBack = () => {
        history.goBack();
    };

    const prepareFormOption = {
        onSaveMember,
        onCancel: goBack,
        initialValues: prepareProfileData(member),
    };

    if (isLoading) {
        return <ProgressBar/>
    }
    return (
        <Row className="animated fadeIn">
            <Col sm={12} className="mb-2">
                <ProgressBar/>
                <HeaderTitle title="Members"/>
                <h5 className="page-heading">{getFormattedMessage('members.modal.edit.title')}</h5>
            </Col>
            <Col sm={12}>
                <div className="sticky-table-container">
                    <Card>
                        <CardBody>
                            <MemberForm {...prepareFormOption} />
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    )
};

EditMember.propTypes = {
    member: PropTypes.object,
    editMember: PropTypes.func,
    fetchMember: PropTypes.func,
    history: PropTypes.object,
};

const mapStateToProps = (state, ownProp) => {
    const { members, isLoading } = state;
    return { member: members.find(member => member.id === +ownProp.match.params.id), isLoading }
};
export default connect(mapStateToProps, { editMember, fetchMember })(EditMember);
