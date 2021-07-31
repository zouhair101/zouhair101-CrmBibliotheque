import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col, Container, Form, Row} from 'reactstrap';
import registrationFormValidate from './registrationFormValidate';
import CustomInputGroup from '../../../../shared/components/CustomInputGroup';
import HeaderTitle from "../../../../shared/header-title/HeaderTitle";
import {getFormattedMessage} from "../../../../shared/sharedMethod";
import {registration} from "../../../store/actions/authAction";
import {Routes} from "../../../../constants";
import ProgressBar from "../../../../shared/progress-bar/ProgressBar";

const MemberRegistration = (props) => {
    const {handleSubmit, invalid, history, registration} = props;

    const onRegistration = async (formValues) => {
        registration(formValues, history);
    };

    return (
        <div className="app flex-row align-items-center">
            <HeaderTitle title="Registration"/>
            <ProgressBar/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                <Form onSubmit={handleSubmit(onRegistration)}>
                                    <h1>{getFormattedMessage('registration.title')}</h1>
                                    <p className="text-muted">{getFormattedMessage('registration.note')}</p>
                                    <Field name="first_name" type="text"  placeholder="registration.input.first-name.label" required
                                           groupText="icon-user" component={CustomInputGroup}/>
                                    <Field name="last_name" type="text" placeholder="registration.input.last-name.label" required
                                           groupText="icon-user" component={CustomInputGroup}/>
                                    <Field name="email" type="email" placeholder="registration.input.email.label"
                                           groupText="icon-envelope" component={CustomInputGroup}/>
                                    <Field name="password" type="password"
                                           placeholder="registration.input.password.label"
                                           groupText="icon-lock" component={CustomInputGroup}/>
                                    <Field name="confirm_password" type="password"
                                           placeholder="registration.input.confirm-password.label"
                                           groupText="icon-lock" component={CustomInputGroup}/>
                                    <div className="d-flex justify-content-between">
                                        <Button color="primary" disabled={invalid} className="px-4">
                                            {getFormattedMessage('registration.submit.title')}
                                        </Button>
                                        <Link to={Routes.MEMBER_LOGIN} color="link"
                                              className="px-0 mt-2 text-right">
                                            {getFormattedMessage('registration.link.login.title')}
                                        </Link>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

MemberRegistration.propTypes = {
    history: PropTypes.object,
    invalid: PropTypes.bool,
    registration: PropTypes.func,
    handleSubmit: PropTypes.func,
    onRegistration:PropTypes.func,
};

const form = reduxForm({form: 'registrationForm', validate: registrationFormValidate})(MemberRegistration);

export default connect(null, {registration})(form);
