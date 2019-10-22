'use strict';

console.log("app.js is running");

var template = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        'Indecsision App'
    ),
    React.createElement(
        'p',
        null,
        'This is some paragrapsh'
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

var user = {
    name: 'Rado',
    age: 33,
    location: 'SD'

    // var userName = 'Rado Radoev'
    // var userAge = 34;
    // var userLocation = 'San Diego';

};var template1 = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        user.name
    ),
    React.createElement(
        'p',
        null,
        'Age: ',
        user.age
    ),
    React.createElement(
        'p',
        null,
        'Location: ',
        user.location
    )
);

var appRoute = document.getElementById('app');

ReactDOM.render(template1, appRoute);
