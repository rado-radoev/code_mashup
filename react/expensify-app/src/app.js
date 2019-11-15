import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const ExpenseDashbordPage = () => (
    <div>
        This is from my dashboard component
    </div>
);

const AddExpensePage = () => (
    <div>
        Add expense component
    </div>
);

const EditExpensePage = () => (
    <div>
        Edit expense component
    </div>
);

const HelpPage = () => (
    <div>
        Help page component
    </div>
);

const NotFoundPage = () => (
    <div>
        404 - <Link to="/">Go Home</Link>
    </div>
);

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <Link to="/">Dashboard</Link>
        <Link to="/create">Create Expense</Link>
        <Link to="/edit">Edit Expense</Link>
        <Link to="/help">Get Help</Link>
    </header>
);

const routes = (
    <BrowserRouter>
        <div>
            <Header />  

            <Switch>
                <Route path="/" component={ExpenseDashbordPage} exact={true} />
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/edit" component={EditExpensePage} />
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
