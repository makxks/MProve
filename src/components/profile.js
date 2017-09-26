import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Profile extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    goHome() {
        this.context.router.push(/*  /user +   */ '/max/home');
    }

    render() {
        return ( 
            <div className="section">
                <h1>Profile</h1>
                <hr />
                <div className="profile">
                    <h3>Username</h3>
                    <h3>Email</h3>
                    <h3>Current Points</h3>
                    <h3>Total Points Earned</h3>
                    <h3>Targets Achieved</h3>
                    <h3>Rewards Claimed</h3>
                </div>
            </div>
        )
    };
}

export default Profile;