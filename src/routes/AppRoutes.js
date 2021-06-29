import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from './../pages/LoginPage';
import { useSelector } from 'react-redux';
import { isLoggedIn } from '../features/login/loginSlice';

const ProtectedRoute = (props) => {
    const _isLoggedIn = useSelector(isLoggedIn);
    if(!_isLoggedIn)
        return (
            <Redirect to="/login" />
        )
    return (
        <Route {...props} />
    )
}

export default function AppRoutes() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <ProtectedRoute path="/" component={MainPage} />
                    <Redirect path="/**" to="/" />
                </Switch>
            </Router>
        </>
    )
}
