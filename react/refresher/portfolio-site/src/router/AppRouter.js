import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Contact from '../components/Contact';
import Header from '../components/Header';
import Home from '../components/Home';
import Item from '../components/Item';
import Portfolio from '../components/Portfolio';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/portfolio" component={Portfolio} exact={true}/>
            <Route path="/portfolio/:id" component={Item}/>
            <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;