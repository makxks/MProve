import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import Auth from '../auth/auth';

class AuthComponent extends Component {
    auth = new Auth();

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);

        this.state = { hasError: false, code: '', message: '' };

        auth.errorOccurred.on('error', (error) => {
            error(error);
        })
    }

    error(error){
        this.setState({ hasError: true });
        if(error.message){
            this.setState({ message: error.message});
        }
        else
        {
            this.setState({ message: 'Please refresh the app and try again'});
        }
        if(error.code){
            this.setState({ code: error.code });
        }
        else{
            this.setState({ code: 'An unexpected error occurred' });
        }
    }

    getWindowValue() {
        var url = window.location.pathname.split("/");
        var method = url[2];
        return method;
    }

    getSignedIn() {
        return this.auth.isAuthenticated();
    }

    getSignedInUser() {
        return this.auth.loggedInUser;
    }

    goHome() {
        this.context.router.push('/')
    }

    renderHomeButton() {
        return ( 
            <button 
                className="primaryButton homeButton"
                onClick={this.goHome.bind(this)}>
                Home
            </button>
        )
    }

    renderSignInOut() {
        if(this.getSignedIn()){
            return (
                <li><Link className="button authButtons" to={"/auth/logout"}>Logout</Link></li>
            )
        }
        else {
            return (
                <li><Link className="button authButtons" to={"/auth/login"}>Login</Link></li>
            )
        }
    }

    renderSignUp() {
        return(
            <li><Link className="button authButtons" to={"/auth/signup"}>Signup</Link></li>
        )
    }

    signOut() {
        this.auth.logout();
        this.context.router.push('/');
    }

    renderAuth() {
        if(this.getWindowValue() == "signup"){
            return (
                <SignupForm className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2" />
            )
        }
        else if(this.getWindowValue() == "login"){
            return (
                <LoginForm className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2" />
            )
        }
        else if(this.getWindowValue() == "logout"){
            return (
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 col-xs-offset-2">
                    <h3>Are you sure you want to logout?</h3>
                    <button onClick={this.signOut()} className="btn btn-danger">Logout</button>
                </div>
            )
        }
    }

    renderError(){
        if(this.state.hasError) {
            return(
                <div className="editPanel">
                    <div className="errorPanel">
                        <h2>{ this.state.code }</h2>
                        <hr />
                        <h4>{ this.state.message }</h4>
                    </div>
                </div>
            )
        }
        else {
            return;
        }
    }

    render() {
        return (
        <div className="authAll">
            <div>
                {this.renderHomeButton()}
                <header>
                    <nav>
                        <ul className="nav nav-justified">
                            {this.renderSignUp()}
                            {this.renderSignInOut()}
                        </ul>
                    </nav>
                </header>                
            </div>
            {this.renderAuth()}
            {this.renderError()}
        </div>
        )
    }
}

export default AuthComponent;