import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Auth from '../auth/auth';
import PasswordResetForm from './passwordResetForm';

class LoginForm extends Component {
    auth = new Auth();

    constructor(props) {
        super(props);

        this.state = { panelCssClass: "hidden" };
    }

    onSubmit(props) {
        this.auth.login(props.email, props.password);
    }

    showResetPanel(){
        this.setState({ panelCssClass: "" });
    }

    hideResetPanel(){
        this.setState({ panelCssClass: "hidden" });
    }

    renderPasswordResetForm(){
        return (
            <div className={this.state.panelCssClass}>
                <PasswordResetForm 
                    hidePanel={this.hideResetPanel.bind(this)}
                />
            </div>
        )
    }

    loginForm(){
        const { fields: { email, password }, handleSubmit } = this.props;

        return (
        <div className="authForm">
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="commentInput">
                <h3>Login</h3>
                <div className={`form-group formInput ${email.touched && email.invalid ? 'has-danger' : ''}`}>
                    <input type="email" className="form-control commentInput" {...email} />
                    <label>Your email</label>
                    <div className="text-help">
                        {email.touched ? email.error : ''}
                    </div>
                </div>
                <div className={`form-group formInput ${password.touched && password.invalid ? 'has-danger' : ''}`}>
                    <input type="password" className="form-control commentInput" {...password} />
                    <label>Password</label>
                    <div className="text-help">
                        {password.touched ? password.error : ''}
                    </div>
                </div>
                <button type="submit" className="primaryButton">Submit</button>
                <button className="primaryButton" onClick={() => this.showResetPanel()}>Reset Password</button>
            </form>
        </div>
        );
        
    }

    //add password reset form
    render() {
        return (
            <div className="commentInput">
                {this.loginForm()}
                {this.renderPasswordResetForm()}
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Enter an email';
    }

    if (!values.password) {
        errors.password = 'Enter your password';
    }

    return errors;
}

export default reduxForm({
    form: 'LoginForm',
    fields: ['password', 'email'],
    validate
}, null)(LoginForm);