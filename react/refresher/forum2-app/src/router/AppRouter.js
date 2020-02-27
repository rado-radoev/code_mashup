import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import AddCommentPage from '../components/AddCommentPage';
import EditCommentPage from '../components/EditCommentPage';
import ForumDashboardPage from '../components/ForumDashboardPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/' component={ForumDashboardPage} exact={true}/>
                <Route path='/create' component={AddCommentPage} />
                <Route path='/edit' component={EditCommentPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;