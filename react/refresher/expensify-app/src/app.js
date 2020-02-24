// import subtract, { square, add } from './utils.js'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import AppRouter from './router/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import {addExpense, startSetExpenses} from './actions/expenses';
import {login, logout} from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import {firebase} from './firebase/firebase';
import {history} from './router/AppRouter';
import LoadingPage from './components/LoadingPage';


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

let hasRendered = false;
const renderApp = () => {
   if (!hasRendered) {
      ReactDOM.render(jsx, document.getElementById('app'));
      hasRendered = true;
   }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      store.dispatch(login(user.uid));
      store.dispatch(startSetExpenses()).then(() => {
         renderApp();
         if (history.location .pathname === '/') {
            history.push('/dashboard');
         }
      });
   } else {
      store.dispatch(logout());
      renderApp();
      history.push('/');
   }
});

