// import subtract, { square, add } from './utils.js'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import AppRouter from './router/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import {addExpense, startSetExpenses} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import './firebase/firebase';
// import './playground/promises';

const store = configureStore();

store.dispatch(addExpense({description: 'Water bill', amount: 400}));
store.dispatch(addExpense({description: 'Gas bill', amount: 150, createdAt: 1000}));
store.dispatch(addExpense({description: 'Rent', amount: 109050}));
// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 3000)

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
   <Provider store={store}>
        <AppRouter />
   </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
   ReactDOM.render(jsx, document.getElementById('app'));
}) ;



