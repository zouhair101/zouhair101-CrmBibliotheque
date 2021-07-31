import React, {Suspense, useEffect, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';
import {
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';
import PropTypes from 'prop-types';
import navigation from '../../config/navbarConfig';
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import routes from '../../routes';
import {loggedConstant, Routes, Tokens} from "../../../constants";
import {checkExistingRoute} from "../../../shared/sharedMethod";

const Footer = lazy(() => import('./Footer'));
const Header = lazy(() => import('./Header'));

const MemberLayout = (props) => {
    const { appName, appLogo, member, location } = props;

    return (
        <div className="app">
            {renderAppHeader(props, appName, appLogo, member)}
            <div className="app-body">
                {renderAppSidebar(props)}
                {renderMainSection(location)}
            </div>
            {renderAppFooter(appName)}
        </div>
    );
};

const renderAppHeader = (props, appName, appLogo, member) => {
    const signOut = (e) => {
        e.preventDefault();
        props.history.push(Routes.MEMBER_HOME);
        localStorage.removeItem('member');
        localStorage.removeItem(Tokens.MEMBER);
        localStorage.setItem(loggedConstant.IS_MEMBER_LOGOUT, 'true');
    };
    return (
        <AppHeader fixed>
            <Suspense fallback={<ProgressBar/>}>
                <Header history={props.history} appName={appName} member={member} appLogo={appLogo}
                        onLogout={e => signOut(e)}/>
            </Suspense>
        </AppHeader>
    );
};

const renderAppSidebar = (props) => {
    return (
        <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
                <AppSidebarNav navConfig={navigation} {...props} />
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
        </AppSidebar>
    );
};

const renderMainSection = (location) => {
    return (
        <main className="main mt-4">
            <Container fluid>
                <Suspense fallback={<ProgressBar/>}>
                    <Switch>
                        {renderRoutes(location)}
                        <Redirect from="/" to={Routes.MEMBER_HOME}/>
                    </Switch>
                </Suspense>
            </Container>
        </main>
    )
};

const renderRoutes = (location) => {
    return routes.map((route, index) => {
        return route.component ? (
            <Route key={index} path={route.path} exact={route.exact} name={route.name} render={props => {
                checkExistingRoute(location, props.history);
                return localStorage.getItem(Tokens.MEMBER) ?
                    <route.component {...props} /> :
                    <Redirect to={Routes.MEMBER_HOME}/>
            }}/>
        ) : (null);
    });
};

const renderAppFooter = (appName) => {
    return (
        <AppFooter>
            <Suspense fallback={<ProgressBar/>}>
                <Footer appName={appName}/>
            </Suspense>
        </AppFooter>
    );
};

MemberLayout.propTypes = {
    member: PropTypes.object,
    location: PropTypes.object,
    permissions: PropTypes.array,
    appName: PropTypes.string,
    appLogo: PropTypes.string,
};

export default MemberLayout;
