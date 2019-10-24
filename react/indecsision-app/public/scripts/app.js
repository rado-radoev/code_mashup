'use strict';

var appRoute = document.getElementById('app');

var button = {
    state: true
};

var toggleButton = function toggleButton() {
    button.state = !button.state;
    console.log(button.state);
    render();
};

var render = function render() {

    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Visibility Toggle'
        ),
        React.createElement(
            'button',
            { id: 'btn', key: '1', onClick: toggleButton },
            button.state ? "Show Details" : "Hide Details"
        ),
        !button.state && React.createElement(
            'p',
            null,
            'Hey. These are some details you can now see.'
        )
    );

    ReactDOM.render(template, appRoute);
};

render();
