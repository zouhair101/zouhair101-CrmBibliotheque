import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, Col, Container, Form, Row} from 'reactstrap';
import loginFormValidate from './loginFormValidate';
import {Routes, Tokens} from "../../../constants";
import CheckBox from '../../../shared/components/CheckBox';
import CustomInputGroup from '../../../shared/components/CustomInputGroup';
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getFormattedMessage, getLocalStorageDataByEncryptKey} from "../../../shared/sharedMethod";
import {login} from "../../store/actions/authAction";
import {displayMessage} from "../../../store/action/toastAction";

const Login = (props) => {
    const { handleSubmit, invalid, history, initialize, login, displayMessage } = props;

    useEffect(() => {
        if (localStorage.getItem(Tokens.ADMIN)) {
            history.push(Routes.ADMIN_DEFAULT);
        }
        initialize(getLocalStorageDataByEncryptKey('currentUser'));
        const params = new URLSearchParams(props.location.search);
        const msg = params.get('msg');
        const success = params.get('success');
        if (msg) {
            displayMessage(msg, +success);
        }
    }, []);

    const onLogin = async (formValues) => {
        login(formValues, history);
    };

    return (
        <div className="app flex-row align-items-center">
            <HeaderTitle title="Login"/>
            <Container>
                <Row className="justify-content-center">
                    <Col md="6" lg="6" xl="4">
                        <Card className="p-3">
                            <CardBody>
                                <Form onSubmit={handleSubmit(onLogin)}>
                                    <h1>{getFormattedMessage('login.title')}</h1>
                                    <p className="text-muted">{getFormattedMessage('login.note')}</p>
                                    <Field name="email" type="email" placeholder="profile.input.email.label"
                                           groupText="icon-envelope" component={CustomInputGroup}/>
                                    <Field name="password" type="password" placeholder="profile.input.password.label"
                                           groupText="icon-lock" component={CustomInputGroup}/>
                                    <div>
                                        <Field name="remember_me"
                                               label={getFormattedMessage('login.checkbox.remember.label')}
                                               component={CheckBox}/>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <Button color="primary" disabled={invalid} className="px-4">
                                            {getFormattedMessage('login.title')}
                                        </Button>
                                        <Link to={Routes.ADMIN_FORGOT_PASSWORD} color="link"
                                              className="px-0 mt-2 text-right">
                                            {getFormattedMessage('login.link.forgot-password.title')}
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

Login.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    invalid: PropTypes.bool,
    initialize: PropTypes.func,
    login: PropTypes.func,
    displayMessage: PropTypes.func,
    handleSubmit: PropTypes.func
};

const form = reduxForm({ form: 'loginForm', validate: loginFormValidate })(Login);

export default connect(null, { login, displayMessage })(form);
