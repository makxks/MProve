import React, {Component} from 'react';

class RewardListItem extends Component{
    constructor(props) {
        super(props);

        this.state = { rewardItem: props.rewardItem, showingDescription: false };

        this.showDescription = this.showDescription.bind(this);
        this.hideDescription = this.hideDescription.bind(this);
        this.renderDescriptionPanel = this.renderDescriptionPanel.bind(this);
    }

    descriptionPanelCssClass = "hidden";

    componentWillReceiveProps(props){
        this.setState({ rewardItem: props.rewardItem });
    }

    componentDidMount(){
        this.setState({ rewardItem: this.props.rewardItem });
    }

    showDescription(){
        this.setState({ showingDescription:true });
    }

    hideDescription(){
        this.setState({ showingDescription:false });
    }

    renderDescriptionPanel(){
        return (
            <div className="descriptionPanel">
                <span className="glyphicon glyphicon-remove closeButton" onClick={() => this.hideDescription()}></span>
                <div className="descriptionContents">
                    <h3>{this.state.rewardItem.name}</h3>
                    <h4>{this.state.rewardItem.points} points</h4>
                    <p className="description">{this.state.rewardItem.description}</p>
                </div>
            </div>
        )
    }

    renderReward(){
        return(
        <ul className="mainListItem">
            <li className="listItem rewardListItem">
                <p><span className="showTargetDetails" onClick={() => this.showDescription()}>{this.state.rewardItem.name}</span>
                    <span className="glyphicon glyphicon-pencil pull-right targetButtons" onClick={() => this.props.showEditAddPanel(this.state.rewardItem, "Edit")}></span>
                </p>
                <p>{this.state.rewardItem.points}</p>
                <button className="glyphicon glyphicon-unchecked removeButton" onClick={() => this.props.claimReward(this.state.rewardItem)}></button>
                <button className="glyphicon glyphicon-remove removeButton" onClick={() => this.props.showRemovePanel(this.state.rewardItem)}></button>
            </li>
        </ul>
        )
    }

    render(){
        if(this.state.showingDescription){
            this.descriptionPanelCssClass = "";
        }
        else if(!this.state.showingDescription){
            this.descriptionPanelCssClass = "hidden";
        }
        return (
            <ul className="mainListItemContainer">
                {this.renderReward()}
                <div className={this.descriptionPanelCssClass + " editPanel"}>
                    {this.renderDescriptionPanel()}
                </div>
            </ul>
        )
    }
}

export default RewardListItem;