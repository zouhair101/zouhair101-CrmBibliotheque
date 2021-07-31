import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col, Container, Form, Row} from 'reactstrap';
import loginFormValidate from './loginFormValidate';
import {Routes} from "../../../constants";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import CustomInputGroup from '../../../shared/components/CustomInputGroup';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {resetPassword} from "../../store/actions/authAction";

const MemberResetPassword = (props) => {
    const { handleSubmit, invalid, history, location, resetPassword } = props;
    const params = new URLSearchParams(location.search);

    const onSubmit = (formValues) => {
        delete formValues.confirm_password;
        formValues.token = params.get('token');
        resetPassword(formValues, history);
    };

    return (
        <div className="app flex-row align-items-center">
            <HeaderTitle title="Reset Password"/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <h1>{getFormattedMessage('reset-password.title')}</h1>
                                    <p className="text-muted">{getFormattedMessage('reset-password.note')}</p>
                                    <Field name="password" type="password" placeholder="profile.input.password.label"
                                           groupText="icon-lock" component={CustomInputGroup}/>
                                    <Field name="confirm_password" type="password"
                                           placeholder="profile.input.confirm-password.label" groupText="icon-lock"
                                           component={CustomInputGroup}/>
                                    <Row>
                                        <Col className="mt-2 d-flex justify-content-end">
                                            <Button color="primary" disabled={invalid} className="px-4">
                                                {getFormattedMessage('global.input.reset-btn.label')}
                                            </Button>
                                            <Link to={Routes.MEMBER_FORGOT_PASSWORD} className="btn btn-secondary ml-2">
                                                {getFormattedMessage('global.input.back-btn.label')}
                                            </Link>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

MemberResetPassword.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    invalid: PropTypes.bool,
    resetPassword: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const form = reduxForm({ form: 'resetPasswordForm', validate: loginFormValidate })(MemberResetPassword);

export default connect(null, { resetPassword })(form);
