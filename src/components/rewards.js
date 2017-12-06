import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import RewardList from './rewardList';

class Rewards extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    goHome() {
        this.context.router.push('/');
    }

    goToTargets(){
        this.context.router.push('/' + localStorage.getItem('username') + '/targets');
    }

    goToProfile(){
        this.context.router.push('/' + localStorage.getItem('username') + '/profile');
    }

    renderLinks() {
        return (
            <div className="linkContainer">
                <button className="linkButton" onClick={this.goToTargets.bind(this)}>Targets</button>
                <button className="linkButton" onClick={this.goToProfile.bind(this)}>Profile</button>
            </div>
        )
    }

    conditionalRender(){
        if(localStorage.getItem('email')){
            return ( 
                <div className="section">
                    <div className="rewardTargetContainer">
                        <h1>Rewards</h1>
                        <hr />
                        <RewardList />
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

export default Rewards;