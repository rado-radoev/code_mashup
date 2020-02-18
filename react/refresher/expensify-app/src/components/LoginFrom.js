import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(startLogin());
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="username"
                        autoFocus
                    />
                    <input 
                        type="password"
                        placeholder="password"
                    />
                    <button>Login</button>
                </form>
            </div>
        );
    }
}

export default connect()(LoginForm);