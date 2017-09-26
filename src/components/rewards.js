import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Rewards extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    goHome() {
        this.context.router.push(/*  /user +   */ '/max/home');
    }

    render() {
        return ( 
            <div className="section">
                <h1>Rewards</h1>
                <hr />
                <div className="rewards">
                </div>
                <button className="button">Add new reward</button>
            </div>
        )
    };
}

export default Rewards;