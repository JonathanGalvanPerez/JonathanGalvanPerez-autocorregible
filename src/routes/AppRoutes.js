import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from './../pages/LoginPage';

export default function AppRoutes() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route path="/" component={MainPage} />
                    <Redirect path="/**" to="/" />
                </Switch>
            </Router>
        </>
    )
}
