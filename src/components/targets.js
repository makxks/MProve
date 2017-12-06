import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TargetList from './targetList';

class Targets extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    goHome() {
        this.context.router.push('/');
    }

    goToProfile(){
        this.context.router.push('/' + localStorage.getItem('username') + '/profile');
    }

    goToRewards(){
        this.context.router.push('/' + localStorage.getItem('username') + '/rewards');
    }

    renderLinks() {
        return (
            <div className="linkContainer">
                <button className="linkButton" onClick={this.goToRewards.bind(this)}>Rewards</button>
                <button className="linkButton" onClick={this.goToProfile.bind(this)}>Profile</button>
            </div>
        )
    }

    conditionalRender(){
        if(localStorage.getItem('email')){
            return (
                <div className="section">
                    <div className="rewardTargetContainer">
                        <h1>Targets</h1>
                        <hr />                
                        <TargetList />
                    </div>
                    {this.renderLinks()}
                </div>
            )
        }
        else {
            return (
                <div className="rewardTargetContainer">
                    <h1>You are not logged in</h1>
                    <hr />
                    <div className="mainButtonGroup">      
                        <button 
                            className="mainButton"
                            onClick={this.goHome.bind(this)}>
                            Go Back
                        </button>
                    </div>
                </div>
            )
        }
    }

    render() {
        return ( 
            <div className="section">
                {this.conditionalRender()}
            </div>
        )
    };
}

export default Targets;