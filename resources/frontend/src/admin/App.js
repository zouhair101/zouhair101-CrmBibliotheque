import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {IntlProvider} from 'react-intl'
import {
    publicImagePath,
    publicImagePathURL,
    settingsKey,
} from '../appConstant'
import LocaleData from './locales'
import {appSettingsKey, LocalStorageKey, Routes, Tokens} from '../constants'
import ProgressBar from '../shared/progress-bar/ProgressBar'
import Toasts from '../shared/toast/Toasts'
import {addRTLSupport} from '../shared/sharedMethod'
import {fetchAppSetting} from '../store/action/appSettingAction'
import {fetchSettings} from './store/actions/settingAction'
import {fetchConfig} from './store/actions/configAction'
import {getUserProfile} from '../store/action/localStorageAction'

const Layout = React.lazy(() => import('./components/layout'));
const Login = React.lazy(() => import('./components/auth/Login'));
const ForgotPassword = React.lazy(
    () => import('./components/auth/ForgotPassword'));
const ResetPassword = React.lazy(
    () => import('./components/auth/ResetPassword'));

const AdminApp = (props) => {
    const { permissions, fetchSettings, settings, getUserProfile, fetchAppSetting, fetchConfig, appSetting, user } = props
    const messages = settings[settingsKey.LANGUAGE]
        ? LocaleData[settings[settingsKey.LANGUAGE].value]
        : LocaleData[settingsKey.DEFAULT_LOCALE];
    let appName = appSetting[appSettingsKey.LIBRARY_NAME]
        ? appSetting[appSettingsKey.LIBRARY_NAME].value
        : null;
    let appLogo = appSetting[appSettingsKey.LIBRARY_LOGO]
        ?
        appSetting[appSettingsKey.LIBRARY_LOGO].logo_url
        : publicImagePath.APP_LOGO;
    const routeProps = { appLogo, appName, permissions, user };
    addRTLSupport(settings[settingsKey.LANGUAGE]
        ? settings[settingsKey.LANGUAGE].value
        : settingsKey.DEFAULT_LOCALE);

    useEffect(() => {
        fetchAppSetting();
        fetchSettings();
        const splitURL = window.location.href.split('?')[0];
        if (!(splitURL.includes('app/admin/login') ||
                splitURL.includes('app/admin/forgot-password') ||
                splitURL.includes('app/admin/reset-password'))) {
            sessionStorage.setItem('prevAdminPrevUrl', window.location.href);
        }

        if (localStorage.getItem(Tokens.ADMIN)) {
            fetchConfig();
            getUserProfile(LocalStorageKey.USER);
        }
    }, []);

    return (
        <IntlProvider locale={settingsKey.DEFAULT_LOCALE} messages={messages}>
            <React.Suspense fallback={<ProgressBar/>}>
                <Switch>
                    <Route path={Routes.ADMIN_LOGIN} name="Login" render={props => <Login {...props}/>}/>
                    <Route path={Routes.ADMIN_FORGOT_PASSWORD} name="Forgot Password"
                           render={props => <ForgotPassword {...props}/>}/>
                    <Route path={Routes.ADMIN_RESET_PASSWORD} name="Reset Password"
                           render={props => <ResetPassword {...props}/>}/>
                    <Route path="/app/admin" name="Home" render={props =>
                        <Layout {...props} {...routeProps}/>}/>
                </Switch>
                <Toasts language={settings[settingsKey.LANGUAGE]
                    ? settings[settingsKey.LANGUAGE].value
                    : null}/>
            </React.Suspense>
        </IntlProvider>
    )
};

AdminApp.propTypes = {
    user: PropTypes.object,
    appSetting: PropTypes.object,
    settings: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    permissions: PropTypes.array,
    fetchSettings: PropTypes.func,
    fetchConfig: PropTypes.func,
    getUserProfile: PropTypes.func,
    fetchAppSetting: PropTypes.func,
    sortAction: PropTypes.func,
};

const mapStateToProps = (state) => {
    const permissions = [];
    const { settings, profile, appSetting, config } = state;
    if (config.permissions) {
        config.permissions.forEach((permission) =>
            permissions.push(permission.name)
        )
    }
    return {
        permissions, user: profile, appSetting, settings,
    }
};

export default connect(mapStateToProps,
    { fetchSettings, fetchConfig, getUserProfile, fetchAppSetting })(AdminApp)
