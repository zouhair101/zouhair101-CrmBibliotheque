import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import MemberApp from './member';
import AdminApp from './admin';
import './App.scss';

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/app/admin" name="Admin Home" render={props => <AdminApp {...props}/>}/>
                <Route path="/" name="Member Home" render={props => <MemberApp {...props}/>}/>
                <Redirect from="*" to="/" exact={true}/>
            </Switch>
        </HashRouter>
    );
};

export default App;
