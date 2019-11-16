import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import ContactPage from '../components/ContactPage';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import PortfolioPage from '../components/PortfolioPage'
import MyWorkPage from '../components/MyWorkPage';
import WelcomePage from '../components/WelcomePage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />  

            <Switch>
                <Route path="/" component={WelcomePage} exact={true} />
                <Route path="/portfolio" component={PortfolioPage} exact={true} />
                <Route path="/portfolio/:id" component={MyWorkPage} />
                <Route path="/contact" component={ContactPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;