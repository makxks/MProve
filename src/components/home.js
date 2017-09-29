import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import LoginButton from './loginButton';

var loggedIn = true;

class Home extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    goToTargets() {
        this.context.router.push(/*  /user +   */ '/max/targets');
    }

    goToRewards() {
        this.context.router.push(/*  /user +   */ '/max/rewards');
    }

    goToProfile() {
        this.context.router.push(/*  /user +   */ '/max/profile');
    }

    renderHomePage(){
        if(!loggedIn){
            return(
                <LoginButton />
            )
        }
        else{
            return ( 
                <div className="mainButtonGroup">
                    <button 
                        className="mainButton"
                        onClick={this.goToTargets.bind(this)}>
                        Targets
                    </button>
                    <button 
                        className="mainButton"
                        onClick={this.goToRewards.bind(this)}>
                        Rewards
                    </button>
                    <button 
                        className="mainButton"
                        onClick={this.goToProfile.bind(this)}>
                        Profile
                    </button>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderHomePage()}
            </div>
        )
    };
}

export default Home;