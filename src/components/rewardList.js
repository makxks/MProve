import React, { Component, PropTypes } from 'react';
import Reward from '../models/reward';
import User from '../models/user';
import RewardListItem from './rewardListItem';
import RewardListItemComplete from './rewardListItemComplete';
import RewardAddReward from './rewardAddReward';
import RewardRemoveReward from './rewardRemoveReward';
import { connect } from 'react-redux';
import { fetchRewards } from '../actions/index';
import Auth from '../auth/auth';

class RewardList extends Component {
    auth = new Auth;

    constructor(props) {
        super(props);

        this.state = { unClaimedRewards: [], claimedRewards: [], panelReward: null, panelFunction: "Add" };

        this.renderListHeadings = this.renderListHeadings.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.renderList = this.renderList.bind(this);
        this.setRewardClaimed = this.setRewardClaimed.bind(this);
        this.setRewardUnclaimed = this.setRewardUnclaimed.bind(this);

        this.showEditAddPanel = this.showEditAddPanel.bind(this);
        this.hideEditAddPanel = this.hideEditAddPanel.bind(this);
        this.showRemovePanel = this.showRemovePanel.bind(this);
        this.hideRemovePanel = this.hideRemovePanel.bind(this);
        this.renderRewardPanel = this.renderRewardPanel.bind(this);
        this.addReward = this.addReward.bind(this);
        this.removeReward = this.removeReward.bind(this);
    }
    
    panelCssClass = "hidden";
    removePanelCssClass = "hidden";

    componentWillMount() {
        var tempClaimed = [];
        var tempUnclaimed = [];
        this.props.fetchRewards(localStorage.getItem('email'))
            .then((response) => {
                if(response.payload){
                    for(var i=0; i<response.payload.length; i++){
                        var newReward = new Reward(
                            response.payload[i].name,
                            response.payload[i].points,
                            response.payload[i].description,
                            response.payload[i].user
                        )
                        if(!response.payload[i].claimed){
                            tempUnclaimed.push(newReward);
                        }
                        else{
                            tempClaimed.push(newReward);
                        }
                    }
                }
                this.setState({ unClaimedRewards: tempUnclaimed, claimedRewards: tempClaimed });
            })       
    }

    setRewardClaimed(reward){
        if(localStorage.getItem('points') >= reward.points){
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
            reward.claimUnclaimReward(true);
            var points = parseInt(localStorage.getItem('points')) - parseInt(reward.points);
            
            localStorage.setItem('points', points);
            localStorage.setItem('rewardsClaimed', parseInt(localStorage.getItem('rewardsClaimed')) + 1);

            var user = new User(localStorage.getItem('email'), localStorage.getItem('username'), localStorage.getItem('points'));
            user.usePoints(reward.points, true);
            this.setState({ unClaimedRewards: tempUnclaimed, claimedRewards: tempClaimed });
        }
        else{
            console.log("not enough points");
        }
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
        reward.claimUnclaimReward(false);
        var points = parseInt(localStorage.getItem('points')) + parseInt(reward.points);
        
        localStorage.setItem('points', points);
        localStorage.setItem('rewardsClaimed', parseInt(localStorage.getItem('rewardsClaimed')) - 1);

        var user = new User(localStorage.getItem('email'), localStorage.getItem('username'), localStorage.getItem('points'));
        user.addPoints(reward.points, true);
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
    
    showRemovePanel(reward){
        this.setState({ panelReward: reward });
        this.removePanelCssClass = "";
    }

    hideRemovePanel(){
        this.setState({ panelReward: null });
        this.removePanelCssClass = "hidden";
    }

    addReward(title, points, description){
        var newReward = new Reward(title, points, description, localStorage.getItem('email'));
        var tempRewardArray = this.state.unClaimedRewards;
        tempRewardArray.push(newReward);
        newReward.createDBReward();
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

    renderRemovePanel(){
        return(
            <div className={this.removePanelCssClass}>
                <RewardRemoveReward
                    reward={this.state.panelReward}
                    hideRemovePanel={this.hideRemovePanel}
                    removeReward={this.removeReward} />
            </div>
        )
    }

    removeReward(reward){
        var tempList = this.state.unClaimedRewards;
        var tempClaimedList = this.state.claimedRewards;
        for(var i=0; i<tempList.length; i++){
            if(tempList[i] == reward){
                reward.deleteReward();
                tempList.splice(i,1);
            }
        }
        for(var i=0; i<tempClaimedList.length; i++){
            if(tempClaimedList[i] == reward){
                reward.deleteReward();
                tempClaimedList.splice(i,1);
            }
        }
        this.setState({ unClaimedRewards: tempList });
        this.setState({ claimedRewards: tempClaimedList });
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
            if(this.state.unClaimedRewards[i]){
                rows.push(<RewardListItem 
                    rewardItem={this.state.unClaimedRewards[i]} 
                    claimReward={this.setRewardClaimed}
                    showEditAddPanel={this.showEditAddPanel}
                    hideEditAddPanel={this.hideEditAddPanel}
                    showRemovePanel={this.showRemovePanel}
                    key={i} />);
            }
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
            if(this.state.claimedRewards[i]){
                rows.push(<RewardListItemComplete 
                    rewardItem={this.state.claimedRewards[i]} 
                    unclaimReward={this.setRewardUnclaimed}
                    showRemovePanel={this.showRemovePanel}
                    key={i} />);
            }
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

    renderUserAndPoints(){
        if(localStorage.getItem('email')){
          return (
            <div className="user">
              <h4 className="username">Hi {localStorage.getItem('username')}</h4><h4 className="userPoints">You have {localStorage.getItem('points')} points</h4>
            </div>
          )
        }
        else{
          return;
        }
    }

    render() {
        return ( 
            <div className="targetList">
                {this.renderUserAndPoints()}
                {this.renderRewardPanel()}
                {this.renderRemovePanel()}
                {this.renderList()}
                <button className="button" onClick={() => {this.showEditAddPanel(null, "Add")}}>Add new reward</button>
                <hr />
                <h3>Completed</h3>
                {this.renderCompletedList()}
            </div>
        )
    };
}

function mapStateToProps(state) {
    return { rewards: state.rewards.all };
};

export default connect(mapStateToProps, { fetchRewards })(RewardList);