import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TargetList from './targetList';

class Targets extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    goHome() {
        this.context.router.push(/*  /user +   */ '/max/home');
    }

    render() {
        return ( 
            <div className="section">
                <h1>Targets</h1>
                <hr />                
                <TargetList />
            </div>
        )
    };
}

export default Targets;