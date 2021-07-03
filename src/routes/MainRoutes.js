import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../components/home/Home';
import Search from '../components/search/Search';
import HeroDetail from '../components/heroDetail/HeroDetail';

export default function MainRoutes() {
    return (
        <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/hero/:id" component={HeroDetail} />
            <Redirect path="/**" to="/home" />
        </Switch>
    )
}
