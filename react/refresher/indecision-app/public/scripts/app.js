'use strict';

console.log('app.js is running');

var template = React.createElement(
   'div',
   null,
   React.createElement(
      'h1',
      null,
      'Indecision App'
   ),
   React.createElement(
      'p',
      null,
      'Some info to not make decision on'
   ),
   React.createElement(
      'ol',
      null,
      React.createElement(
         'li',
         null,
         'Item one'
      ),
      React.createElement(
         'li',
         null,
         'Item two'
      )
   )
);

var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
