'use strict';

var appRoot = document.getElementById('app');

var button = {
    clicked: false
};

var toggle = function toggle() {
    button.clicked = !button.clicked;
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
            { onClick: toggle },
            button.clicked ? 'Hide details' : 'Show details'
        ),
        button.clicked && React.createElement(
            'p',
            null,
            'Hey.These are some details you can now see!'
        )
    );

    ReactDOM.render(template, appRoot);
};

render();
