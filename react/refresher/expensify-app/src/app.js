// import subtract, { square, add } from './utils.js'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
    <div>
        This is from expensify dashboard
    </div>
);

const AddExpensePage = () => (
    <div>
        This is my add expense component
    </div>
);

const EditxpensePage = () => (
    <div>
        This is my edit expense component
    </div>
);

const HelpPage = () => (
    <div>
        This is my help component
    </div>
);

const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage} exact={true}/>
            <Route path="/create" component={AddExpensePage}/>
            <Route path="/edit" component={EditxpensePage}/>
            <Route path="/help" component={HelpPage}/>
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));

