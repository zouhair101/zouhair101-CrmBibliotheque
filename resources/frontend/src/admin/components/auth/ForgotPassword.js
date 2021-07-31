import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col, Container, Form, Row} from 'reactstrap';
import loginFormValidate from './loginFormValidate';
import {environment} from "../../../environment";
import {Routes} from "../../../constants";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import CustomInputGroup from '../../../shared/components/CustomInputGroup';
import {getFormattedMessage} from "../../../shared/sharedMethod";
import {forgotPassword} from "../../store/actions/authAction";

const ForgotPassword = (props) => {
    const { handleSubmit, invalid, isSubmitted,forgotPassword } = props;

    const onSubmit = (formValues) => {
        formValues.url = environment.URL + '/#' + Routes.ADMIN_RESET_PASSWORD;
        forgotPassword(formValues);
    };

    return (
        <div className="app flex-row align-items-center">
            <HeaderTitle title="Forgot Password"/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Card className="p-3">
                            <CardBody>
                                {!isSubmitted ?
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <h1>{getFormattedMessage('forgot-password.title')}</h1>
                                        <p className="text-muted">{getFormattedMessage('forgot-password.note')}</p>
                                        <Field name="email" type="email" placeholder="profile.input.email.label"
                                               groupText="icon-envelope" component={CustomInputGroup}/>
                                        <Row>
                                            <Col className="mt-2 d-flex justify-content-end">
                                                <Button color="primary" disabled={invalid} className="px-4">
                                                    {getFormattedMessage('global.input.submit-btn.label')}
                                                </Button>
                                                <Link to={Routes.ADMIN_LOGIN} className="btn btn-secondary ml-2">
                                                    {getFormattedMessage('global.input.cancel-btn.label')}
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Form> :
                                    <div>
                                        <div className="text-center">
                                            <p>{getFormattedMessage('forgot-password.email.note')}</p>
                                            <Link to={Routes.ADMIN_LOGIN} color="link">
                                                {getFormattedMessage('forgot-password.link.go-back.title')}
                                            </Link>
                                        </div>
                                    </div>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

ForgotPassword.propTypes = {
    invalid: PropTypes.bool,
    isSubmitted: PropTypes.bool,
    forgotPassword: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const form = reduxForm({ form: 'forgotPasswordForm', validate: loginFormValidate })(ForgotPassword);
const mapStateToProps = (state) => {
    return { isSubmitted: !!state.adminAuth.isSubmitted };
};

export default connect(mapStateToProps, { forgotPassword })(form);
