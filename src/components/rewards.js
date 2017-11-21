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

    conditionalRender(){
        if(localStorage.getItem('email')){
            return ( 
                <div className="rewardTargetContainer">
                    <h1>Rewards</h1>
                    <hr />
                    <RewardList />
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