// import subtract, { square, add } from './utils.js'
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const store = configureStore();

console.log(store.getState());

ReactDOM.render(<AppRouter />, document.getElementById('app'));

