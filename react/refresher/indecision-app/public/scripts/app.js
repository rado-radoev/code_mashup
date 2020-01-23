'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VisibilityApp = function (_React$Component) {
    _inherits(VisibilityApp, _React$Component);

    function VisibilityApp() {
        _classCallCheck(this, VisibilityApp);

        return _possibleConstructorReturn(this, (VisibilityApp.__proto__ || Object.getPrototypeOf(VisibilityApp)).apply(this, arguments));
    }

    _createClass(VisibilityApp, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Header, null),
                React.createElement(Action, null)
            );
        }
    }]);

    return VisibilityApp;
}(React.Component);

var Action = function (_React$Component2) {
    _inherits(Action, _React$Component2);

    function Action(props) {
        _classCallCheck(this, Action);

        var _this2 = _possibleConstructorReturn(this, (Action.__proto__ || Object.getPrototypeOf(Action)).call(this, props));

        _this2.handleToggleView = _this2.handleToggleView.bind(_this2);
        _this2.state = {
            visibility: false
        };
        return _this2;
    }

    _createClass(Action, [{
        key: 'handleToggleView',
        value: function handleToggleView() {
            this.setState(function (prevState) {
                return { visibility: !prevState.visibility };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { onClick: this.handleToggleView },
                    this.state.visibility ? 'Hide details' : 'Show details'
                ),
                this.state.visibility && React.createElement(DisplayMessage, { message: 'Hey.These are some details you can now see!' })
            );
        }
    }]);

    return Action;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        )
    );
};

Header.defaultProps = {
    title: 'Visibility Toggle'
};

var DisplayMessage = function DisplayMessage(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            props.message
        )
    );
};

DisplayMessage.defaultProps = {
    message: 'A message should be displayed here, but none was set. So ... "Hello!"'
};

ReactDOM.render(React.createElement(VisibilityApp, null), document.getElementById('app'));

// const appRoot = document.getElementById('app');

// const button = {
//     clicked: false
// }

// const toggle = () => {
//     button.clicked = !button.clicked
//     render();
// }

// const render = () => {

//     const template = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick={toggle}>{button.clicked ? 'Hide details' : 'Show details'}</button>
//             {button.clicked && <p>Hey.These are some details you can now see!</p>}
//         </div>
//     );

//     ReactDOM.render(template, appRoot);
// }

// render();
