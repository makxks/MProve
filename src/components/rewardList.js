import React, { Component, PropTypes } from 'react';
import Reward from '../models/reward';
import RewardListItem from './rewardListItem';
import RewardListItemComplete from './rewardListItemComplete';
import RewardAddReward from './rewardAddReward';


class RewardList extends Component {
    constructor(props) {
        super(props);

        this.state = { unClaimedRewards: [], claimedRewards: [], panelReward: null, panelFunction: "Add" };

        this.renderListHeadings = this.renderListHeadings.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.renderList = this.renderList.bind(this);
        this.setRewardClaimed = this.setRewardClaimed.bind(this);
        this.setRewardUnclaimed = this.setRewardUnclaimed.bind(this);

        this.showEditAddPanel = this.showEditAddPanel.bind(this);
        this.addReward = this.addReward.bind(this);
        this.renderRewardPanel = this.renderRewardPanel.bind(this);
        this.hideEditAddPanel = this.hideEditAddPanel.bind(this);
    }

    panelCssClass = "hidden";

    setRewardClaimed(reward){
        var tempUnclaimed = [];
        var tempClaimed = [];
        tempClaimed = this.state.claimedRewards;
        tempUnclaimed = this.state.unClaimedTargets;
        tempClaimed.push(reward);
        for(var i=0; i<tempUnclaimed.length; i++){
            if(tempUnclaimed[i] == reward){
                tempUnclaimed.splice(i,1);
                break;
            }
        }
        this.setState({ unClaimedRewards: tempUnclaimed, claimedRewards: tempClaimed });
    }

    setRewardUnclaimed(reward){
        var tempUnclaimed = [];
        var tempClaimed = [];
        tempClaimed = this.state.claimedTargets.slice();
        tempUnclaimed = this.state.unClaimedTargets.slice();
        tempUnclaimed.push(reward);
        for(var i=0; i<tempClaimed.length; i++){
            if(tempClaimed[i] == reward){
                tempClaimed.splice(i,1);
                break;
            }
        }
        this.setState({ unClaimedRewards: tempUnclaimed, claimedRewards: tempClaimed });
    }

    showEditAddPanel(reward, addOrEdit){
        this.setState({ panelReward: target });
        this.setState({ panelFunction: addOrEdit });
        this.panelCssClass = "";
    }

    hideEditAddPanel(){
        this.setState({ panelReward: null });
        this.panelCssClass = "hidden";
    }

    addReward(title, points){
        var newReward = new Reward(title, points);
        var tempRewardArray = this.state.unClaimedRewards;
        tempRewardArray.push(newReward);
        this.setState({ unClaimedRewards: tempRewardArray });
    }

    renderRewardPanel(){
        return(
            <div className={this.panelCssClass}>
                <RewardAddReward
                    addReward={this.addReward}
                    addOrEdit={this.state.panelFunction}
                    reward={this.state.panelReward} 
                    hideEditAddPanel={this.hideEditAddPanel}/>
            </div>
        )
    }

    renderListHeadings(){
        return (
            <li className="listItem headingsComplete">
                <p>Reward</p>
                <p>Points</p>
                <p>Claim</p>
                <p>Delete</p>
            </li>
        )
    }

    renderCompletedListHeadings(){
        return (
            <li className="headingsComplete">
                <p>Target</p>
                <p>Points</p>
                <p>Unclaim</p>
                <p>Delete</p>
            </li>
        )
    }

    renderListItems(){      
        var rows = [];
        for(var i=0; i<this.state.unClaimedRewards.length; i++){
            rows.push(<RewardListItem 
                rewardItem={this.state.unClaimedRewards[i]} 
                claimReward={this.setRewardClaimed}
                showEditAddPanel={this.showEditAddPanel}
                hideEditAddPanel={this.hideEditAddPanel}
                key={i} />);
        }
        return(
            <ul className="mainList">
                {rows}
            </ul>
        )
    }

    renderCompletedListItems(){      
        var rows = [];
        for(var i=0; i<this.state.claimedRewards.length; i++){
            rows.push(<RewardListItemComplete rewardItem={this.state.claimedRewards[i]} unclaimReward={this.setRewardUnclaimed} key={i} />);
        }
        return(
            <ul className="mainListComplete">
                {rows}
            </ul>
        )
    }

    renderList() {
        return (
            <div className="targets">
                <ul className="list">
                    {this.renderListHeadings()}
                    {this.renderListItems()}
                </ul>
            </div>
        )
    }

    renderCompletedList() {
        return (
            <div className="targets">
                <ul className="list">
                    {this.renderCompletedListHeadings()}
                    {this.renderCompletedListItems()}
                </ul>
            </div>
        )
    }

    render() {
        return ( 
            <div className="targetList">
                {this.renderRewardPanel()}
                {this.renderList()}
                <button className="button" onClick={() => {this.showEditAddPanel(null, "Add")}}>Add new target</button>
                <hr />
                <h3>Completed</h3>
                {this.renderCompletedList()}
            </div>
        )
    };
}

export default RewardList;