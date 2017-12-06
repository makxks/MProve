import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Auth from '../auth/auth';

class PasswordResetForm extends Component {
    auth = new Auth();

    onSubmit(){
        this.auth.changePassword(props.email);
    }

    render() {
        const { fields: { email }, handleSubmit } = this.props;

        return ( 
            <div className="editPanel">
                <div className="editPanelForm">
                    <span className="glyphicon glyphicon-remove closeButton" onClick={() => this.props.hidePanel()}></span>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="commentInput">
                        <h3>Reset Password</h3>
                        <div className={`form-group formInput ${email.touched && email.invalid ? 'has-danger' : ''}`}>
                            <input type="email" required className="form-control commentInput" {...email} />
                            <label>Enter your email here</label>
                            <div className="text-help">
                                {email.touched ? email.error : ''}
                            </div>
                        </div>
                        <p>You will be sent an email advising you how to reset your password</p>
                        <button type="submit" className="primaryButton">Submit</button>
                    </form>
                </div>
            </div>
        )
    };
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Enter an email';
    }

    return errors;
}

export default reduxForm({
    form: 'PasswordResetForm',
    fields: ['email'],
    validate
}, null)(PasswordResetForm);