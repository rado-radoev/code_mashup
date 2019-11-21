import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();

store.subscribe( () => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

// addExpense -> Water bill
store.dispatch(addExpense({description: 'Water bill'}));
// addExpense -> Gas bill
store.dispatch(addExpense({description: 'Gas bill'}));
// setTextFilter -> bill (2 items) -> water (1 item)
store.dispatch(setTextFilter('bill'));
store.dispatch(setTextFilter('water'));
// getVisibleExpenses -> print visible ones to screen


ReactDOM.render(<AppRouter />, document.getElementById('app'));
