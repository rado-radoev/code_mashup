"use strict";

console.log("app.js is running");

var template = React.createElement(
    "div",
    null,
    React.createElement(
        "h1",
        null,
        "Indecsision App"
    ),
    React.createElement(
        "p",
        null,
        "This is some paragrapsh"
    ),
    React.createElement(
        "ol",
        null,
        React.createElement(
            "li",
            null,
            "Item one"
        ),
        React.createElement(
            "li",
            null,
            "Item two"
        )
    )
);

var template1 = React.createElement(
    "div",
    null,
    React.createElement(
        "h1",
        null,
        "Radoslav Radoev"
    ),
    React.createElement(
        "p",
        null,
        "Age: 33"
    ),
    React.createElement(
        "p",
        null,
        "Location: San Diego"
    )
);

var appRoute = document.getElementById('app');

ReactDOM.render(template1, appRoute);
