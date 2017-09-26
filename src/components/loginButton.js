import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class LoginButton extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    //componentDidMount(){
        //if logged in -->> home
    //}

    goToLoginPage() {
        this.context.router.push('/auth/login');
    }

    render() {
        return ( 
            <div className="mainButtonGroup">
                <button 
                    className="mainButton"
                    onClick={this.goToLoginPage.bind(this)}>
                    Login
                </button>
            </div>
        )
    };
}

export default LoginButton;