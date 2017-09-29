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
    removePanelCssClass = "hidden";

    setRewardClaimed(reward){
        var tempUnclaimed = [];
        var tempClaimed = [];
        tempClaimed = this.state.claimedRewards;
        tempUnclaimed = this.state.unClaimedRewards;
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
        tempClaimed = this.state.claimedRewards;
        tempUnclaimed = this.state.unClaimedRewards;
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
        this.setState({ panelReward: reward });
        this.setState({ panelFunction: addOrEdit });
        this.panelCssClass = "";
    }

    hideEditAddPanel(){
        this.setState({ panelReward: null });
        this.panelCssClass = "hidden";
    }

    addReward(title, points, description){
        var newReward = new Reward(title, points, description);
        var tempRewardArray = this.state.unClaimedRewards;
        tempRewardArray.push(newReward);
        this.setState({ unClaimedRewards: tempRewardArray });
    }

    showRemovePanel(reward){
        this.setState({ panelReward: reward });
        this.removePanelCssClass = "";
    }

    hideRemovePanel(){
        this.setState({ panelReward: null });
        this.removePanelCssClass = "hidden";
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
            <li className="headingsComplete">
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
                <p>Reward</p>
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
                showRemovePanel={this.showRemovePanel}
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
                <button className="button" onClick={() => {this.showEditAddPanel(null, "Add")}}>Add new reward</button>
                <hr />
                <h3>Completed</h3>
                {this.renderCompletedList()}
            </div>
        )
    };
}

export default RewardList;