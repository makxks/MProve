import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Auth from '../auth/auth';
import axios from 'axios';

class Profile extends Component {
    auth = new Auth();

    static contextTypes = {
        router: PropTypes.object
    };

    goHome() {
        this.context.router.push('/');
    }

    getUserName() {
        return localStorage.getItem('username');
    }

    getEmail() {
        return localStorage.getItem('email');
    }

    getPoints() {
        return localStorage.getItem('points');
    }

    getTotalPoints() {
        return localStorage.getItem('totalPoints');
    }

    getRewardsClaimed() {
        return localStorage.getItem('rewardsClaimed');
    }

    getTargetsReached() {
        return localStorage.getItem('targetsReached');
    }

    resetPassword() {
        this.auth.changePassword(localStorage.getItem('email'));
    }

    render() {
        return ( 
            <div className="section">
                <h1>Profile</h1>
                <hr />
                <div className="profile">
                    <h4>Username</h4>
                    <hr/>
                    <h4 className="answer">{this.getUserName()}</h4>
                    <h4>Email</h4>
                    <hr/>
                    <h4 className="answer">{this.getEmail()} <button className="answerButton" onClick={() => this.resetPassword.bind(this)}>Change Password</button></h4>
                    <h4>Current Points</h4>
                    <hr/>
                    <h4 className="answer">{this.getPoints()}</h4>
                    <h4>Total Points Earned</h4>
                    <hr/>
                    <h4 className="answer">{this.getTotalPoints()}</h4>
                    <h4>Rewards Claimed</h4>
                    <hr/>
                    <h4 className="answer">{this.getRewardsClaimed()}</h4>
                    <h4>Targets Reached</h4>
                    <hr/>
                    <h4 className="answer">{this.getTargetsReached()}</h4>
                </div>
            </div>
        )
    };
}

export default Profile;