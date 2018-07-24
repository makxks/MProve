import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Auth from '../auth/auth';
import PasswordResetForm from './passwordResetForm';

class LoginForm extends Component {
    auth = new Auth();

    constructor(props) {
        super(props);

        this.state = { panelCssClass: "hidden", error: null, tryingLogin: false };
    }

    onSubmit(props) {
        this.setState({ tryingLogin: true })
        try {
            this.auth.login(props.email, props.password, (err) => {
                if(err){
                    this.setState({ error: err, tryingLogin: false });
                }
                else{
                    this.setState({ tryingLogin: false });
                }
            });
        }
        catch(error) {
            this.setState({ error });
        }
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

    renderErrorPanel(){
        if(this.state.error){
            return (
                <div className={"editPanel"}>
                    <div className="errorPanel">
                        <h2>An error occurred or your login credentials are incorrect</h2>
                        <hr />
                        <h4>Please refresh the app and try again</h4>
                    </div>
                </div>
            )
        }
    }

    loginForm(){
        const { fields: { email, password }, handleSubmit } = this.props;

        if(!this.state.tryingLogin){
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
        else{
            return (
                <div className="authForm">
                    <h4>Logging in....</h4>
                </div>
            )
        }
        
    }

    //add password reset form
    render() {
        return (
            <div className="commentInput">
                {this.loginForm()}
                {this.renderPasswordResetForm()}
                {this.renderErrorPanel()}
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