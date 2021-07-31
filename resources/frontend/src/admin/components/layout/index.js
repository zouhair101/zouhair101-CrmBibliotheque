import React, {Suspense, lazy} from 'react';
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
import routes from "../../routes";
import {loggedConstant, Routes, Tokens} from "../../../constants";
import ProgressBar from '../../../shared/progress-bar/ProgressBar';
import {checkExistingRoute} from "../../../shared/sharedMethod";

const Footer = lazy(() => import('./Footer'));
const Header = lazy(() => import('./Header'));

const Layout = (props) => {
    const { permissions, appLogo, appName, user, location } = props;
    const newRoutes = prepareRoutes(permissions);

    if (permissions.length === 0) {
        return null;
    }

    return (
        <div className="app">
            {renderAppHeader(props, appName, appLogo, user)}
            <div className="app-body">
                {renderAppSidebar(props, prepareNavigation(permissions))}
                {renderMainSection(newRoutes, location)}
            </div>
            {renderAppFooter(appName)}
        </div>
    );
};

const prepareRoutes = (permissions) => {
    let filterRoutes = [];
    routes.forEach((route) => {
        if (permissions.includes(route.permission)) {
            filterRoutes.push(route)
        }
    });
    return filterRoutes;
};

const prepareNavigation = (permissions) => {
    let sideMenu = navigation;
    let routes = [];
    sideMenu.items.forEach(route => {
        if (permissions.includes(route.permission)) {
            routes.push(route);
        }
    });
    sideMenu.items = routes;
    sideMenu.items = sideMenu.items.slice();
    return navigation;
};

const renderAppHeader = (props, appName, appLogo, user) => {
    const signOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem(Tokens.ADMIN);
        localStorage.setItem(loggedConstant.IS_USER_LOGOUT, 'true');
        props.history.push(Routes.ADMIN_LOGIN);
    };
    return (
        <AppHeader fixed>
            <Suspense fallback={<ProgressBar/>}>
                <Header history={props.history} appName={appName} user={user} appLogo={appLogo}
                        onLogout={e => signOut(e)}/>
            </Suspense>
        </AppHeader>
    );
};

const renderAppSidebar = (props, sideMenuList) => {
    return (
        <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
                <AppSidebarNav navConfig={sideMenuList} {...props} />
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
        </AppSidebar>
    );
};

const renderMainSection = (newRoutes, location) => {
    return (
        <main className="main mt-4">
            <Container fluid>
                <Suspense fallback={<ProgressBar/>}>
                    <Switch>
                        {renderRoutes(newRoutes, location)}
                        <Redirect from="/" to={Routes.ADMIN_DEFAULT}/>
                    </Switch>
                </Suspense>
            </Container>
        </main>
    )
};

const renderRoutes = (newRoutes, location) => {
    return newRoutes.map((route, index) => {
        return route.component ? (
            <Route key={index} path={route.path} exact={route.exact} name={route.name} render={props => {
                checkExistingRoute(location, props.history);
                return localStorage.getItem(Tokens.ADMIN) ?
                    <route.component {...props}/> :
                    <Redirect to={Routes.ADMIN_LOGIN}/>
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

Layout.propTypes = {
    user: PropTypes.object,
    location: PropTypes.object,
    permissions: PropTypes.array,
    appName: PropTypes.string,
    appLogo: PropTypes.string,
};

export default Layout;
