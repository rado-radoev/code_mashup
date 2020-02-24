import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginFrom';

const LoginPage = (props) => (
    <div>
        <LoginForm />
    </div>
);

export default connect()(LoginPage);