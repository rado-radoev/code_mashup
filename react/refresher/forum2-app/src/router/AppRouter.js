import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import AddCommentPage from '../components/AddCommentPage';
import EditCommentPage from '../components/EditCommentPage';
import ForumDashboardPage from '../components/ForumDashboardPage';
import HelpPage from '../components/HelpPage';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path='/' component={ForumDashboardPage} exact={true}/>
                <Route path='/create' component={AddCommentPage} />
                <Route path='/edit/:id' component={EditCommentPage} />
                <Route path='/help' component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;