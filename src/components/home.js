import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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

    render() {
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
    };
}

export default Home;