'use strict';

console.log("app.js is running");

var app = {
    title: 'Indecision App',
    subtitle: 'Catchy subtitle',
    options: ['One', 'Two']
};

function getOptions(options) {
    if (options.length > 0) {
        return options;
    }
}

var template = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        app.title
    ),
    app.subtitle && React.createElement(
        'p',
        null,
        app.subtitle
    ),
    React.createElement(
        'p',
        null,
        app.options.length > 0 ? 'Here are your options' : 'No options'
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
    age: 29,
    location: 'SD'

    // var userName = 'Rado Radoev'
    // var userAge = 34;
    // var userLocation = 'San Diego';

};function getLocation(location) {
    if (location) {
        return React.createElement(
            'p',
            null,
            'Location: ',
            location
        );
    }
}

var template1 = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        user.name ? user.name : 'Anonymous'
    ),
    user.age && user.age >= 18 && React.createElement(
        'p',
        null,
        'Age: ',
        user.age
    ),
    getLocation(user.location)
);

var appTemplate = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        app.title
    ),
    React.createElement(
        'h4',
        null,
        app.subtitle
    )
);

var appRoute = document.getElementById('app');

ReactDOM.render(template, appRoute);
