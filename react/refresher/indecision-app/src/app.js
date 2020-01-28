// import subtract, { square, add } from './utils.js'
import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css'
import './styles/styles.scss';


ReactDOM.render(<IndecisionApp options={['Option One', 'Option Two']}/>, document.getElementById('app'));

