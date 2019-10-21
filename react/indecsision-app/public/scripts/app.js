"use strict";

console.log("app.js is running");

var template = React.createElement(
  "h1",
  null,
  "Indecsision App"
);
var appRoute = document.getElementById('app');

ReactDOM.render(template, appRoute);
