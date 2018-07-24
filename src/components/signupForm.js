import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Auth from '../auth/auth';
import User from '../models/user';

class SignupForm extends Component {
    auth = new Auth();

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = { error: null, tryingSignup: false };
    }

    onSubmit(props) {
        this.setState({ tryingSignup: true });
        var user = new User(props.email, props.username);
        this.auth.signup(props.email, props.password, user, (err) => {
            if (err){
                this.setState({ error: err });
                this.setState({ tryingSignup: false });
            }
            else{
                this.setState({ tryingSignup: false });
            }
        });
        this.context.router.push('/'); 
    }

    signupForm(){
        const { fields: { email, username, password, passwordConfirm }, handleSubmit } = this.props;
   
        if(!this.state.tryingSignup){
            return (
            <div className="authForm">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="commentInput">
                    <h3>Signup</h3>
                    <div className={`form-group formInput ${email.touched && email.invalid ? 'has-danger' : ''}`}>
                        <input type="email" className="form-control commentInput" {...email} />
                        <label>Your email</label>
                        <div className="text-help">
                            {email.touched ? email.error : ''}
                        </div>
                    </div>
                    <div className={`form-group formInput ${username.touched && username.invalid ? 'has-danger' : ''}`}>
                        <input type="text" className="form-control commentInput username" {...username} />
                        <label>Choose a username</label>
                        <div className="text-help">
                            {username.touched ? username.error : ''}
                        </div>
                    </div>
                    <div className={`form-group formInput ${password.touched && password.invalid ? 'has-danger' : ''}`}>
                        <input type="password" className="form-control commentInput" {...password} />
                        <label>Enter a new password</label>
                        <div className="text-help">
                            {password.touched ? password.error : ''}
                        </div>
                    </div>
                    <div className={`form-group formInput ${passwordConfirm.touched && passwordConfirm.invalid ? 'has-danger' : ''}`}>
                        <input type="password" className="form-control commentInput" {...passwordConfirm} />
                        <label>Reenter your password</label>
                        <div className="text-help">
                            {passwordConfirm.touched ? passwordConfirm.error : ''}
                        </div>
                    </div>
                    <button type="submit" className="primaryButton">Submit</button>
                </form>
            </div>
            );
        }
        else{
            return (
                <div className="authForm">
                    <h4>Signing up....</h4>
                </div>
            );
        }
        
    }

    render() {
        return (
            <div className="commentInput">
                {this.signupForm()}
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Enter your email';
    }

    if (!values.username) {
        errors.username = 'Enter a username';
    }

    if (!values.password) {
        errors.password = 'Enter a new password';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Reenter the password';
    }
    else if(values.password !== values.passwordConfirm){
        errors.passwordConfirm = "The passwords don't match";
    }

    return errors;
}

export default reduxForm({
    form: 'SignupForm',
    fields: ['email', 'username', 'password', 'passwordConfirm'],
    validate
}, null)(SignupForm);