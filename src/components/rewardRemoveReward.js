import React, {Component} from 'react';

class RewardRemoveReward extends Component{   
    constructor(props) {
        super(props);

        this.state = {reward: this.props.reward};

        this.removeThisReward = this.removeThisReward.bind(this)
    }

    componentWillReceiveProps(props){
        this.setState({ reward: props.reward });
    }

    removeThisReward(){
        this.props.removeReward(this.state.reward);
        this.setState({ reward: null });
        this.props.hideRemovePanel();
    }

    renderPanel(){
        return(
            <div className="editPanelForm">
                <span className="glyphicon glyphicon-remove closeButton" onClick={() => this.props.hideRemovePanel()}></span>
                <div className="removePanelContents">
                <h3>Are you sure you want to delete this reward?</h3>
                <button type="submit" className="buttonForm" onClick={() => this.removeThisReward()}>Yes</button>
                <button type="submit" className="buttonForm" onClick={() => this.props.hideRemovePanel()}>No</button>
                </div>
            </div>      
        )
    }

    render() {
        return ( 
            <div className="editPanel">
                {this.renderPanel()}
            </div>
        )
    };
}

export default RewardRemoveReward;