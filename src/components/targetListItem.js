import React, { Component, PropTypes } from 'react';
import Target from '../models/target';
import TargetListSubItem from './targetListSubItem';

class TargetListItem extends Component {
    constructor(props) {
        super(props);

        this.state = { targetItem: props.targetItem, showingSubtasks: true, showingDescription: false };

        this.renderTarget = this.renderTarget.bind(this);
        this.renderSubTargets = this.renderSubTargets.bind(this);
        this.removeSubTarget = this.removeSubTarget.bind(this);
        this.showSubList = this.showSubList.bind(this);
        this.hideSubList = this.hideSubList.bind(this);
        this.renderShowButton = this.renderShowButton.bind(this);
        this.renderHideButton = this.renderHideButton.bind(this);
        this.showDescription = this.showDescription.bind(this);
        this.hideDescription = this.hideDescription.bind(this);
        this.renderDescriptionPanel = this.renderDescriptionPanel.bind(this);
    }

    descriptionPanelCssClass = "hidden";

    componentWillReceiveProps(props){
        this.setState({ targetItem: props.targetItem });
    }

    showSubList(){
        this.setState({ showingSubtasks: true });
    }

    hideSubList(){
        this.setState({ showingSubtasks: false });
    }

    showDescription(){
        this.setState({ showingDescription:true });
    }

    hideDescription(){
        this.setState({ showingDescription:false });
    }

    renderSubTargets(){
        var rows = [];
        for(var i=0; i<this.state.targetItem.subtargets.length; i++){
            rows.push(<TargetListSubItem 
                subTarget={this.state.targetItem.subtargets[i]} 
                removeTarget={this.removeSubTarget} 
                showEditAddPanel={this.props.showEditAddPanel} 
                key={i} />);
        }
        var cssClass = "";
        if(this.state.showingSubtasks){
            cssClass = "subList"
        }
        else if(!this.state.showingSubtasks){
            cssClass = "subList hidden"
        }
        return(
            <ul className={cssClass}>
                {rows}
            </ul>
        )
    }

    removeSubTarget(subtarget){
        var tempTargetItem = this.state.targetItem;
        for(var i=0; i<tempTargetItem.subtargets.length; i++){
            if(tempTargetItem.subtargets[i] == subtarget){
                tempTargetItem.subtargets.splice(i,1);
                break;
            }
        }
        this.setState({ targetItem: tempTargetItem });
    }

    completeSubTarget(subtarget){
        var tempTargetItem = this.state.targetItem;
        var targets = this.state.targetItem.subtargets;
        for(var i=0; i<targets.length; i++){
            if(targets[i] == subtarget){
                targets[i].complete = true;
                break;
            }
        }
        tempTargetItem.subtargets = targets;
        this.setState({ targetItem: tempTargetItem })
    }

    uncompleteSubTarget(subtarget){
        var tempTargetItem = this.state.targetItem;
        var targets = this.state.targetItem.subtargets;
        for(var i=0; i<targets.length; i++){
            if(targets[i] == subtarget){
                targets[i].complete = false;
                break;
            }
        }
        tempTargetItem.subtargets = targets;
        this.setState({ targetItem: tempTargetItem })
    }

    renderDescriptionPanel(){
        return (
            <div className="descriptionPanel">
                <span className="glyphicon glyphicon-remove closeButton" onClick={() => this.hideDescription()}></span>
                <div className="descriptionContents">
                    <h3>{this.state.targetItem.name}</h3>
                    <h4>{this.state.targetItem.length}</h4>
                    <h4>{this.state.targetItem.points} points</h4>
                    <p className="description">{this.state.targetItem.description}</p>
                </div>
            </div>
        )
    }

    renderShowButton(){
        var cssClass = "";
        if(this.state.showingSubtasks){
            cssClass = "glyphicon glyphicon-menu-right pull-left showSubTasks targetButtons hidden"
        }
        else if(!this.state.showingSubtasks){
            cssClass = "glyphicon glyphicon-menu-right pull-left showSubTasks targetButtons";
        }
        return(
        <span className={cssClass} onClick={() => this.showSubList()}></span>
        )
    }

    renderHideButton(){
        var cssClass = "";
        if(this.state.showingSubtasks){
            cssClass = "glyphicon glyphicon-menu-down pull-left showSubTasks targetButtons"
        }
        else if(!this.state.showingSubtasks){
            cssClass = "glyphicon glyphicon-menu-down pull-left showSubTasks targetButtons hidden";
        }
        return (
        <span className={cssClass} onClick={() => this.hideSubList()}></span>
        )
    }

    renderTarget(){
        return(
        <ul className="mainListItem">
            <li className="listItem">
                <p><span className="showTargetDetails" onClick={() => this.showDescription()}>{this.state.targetItem.name}</span>
                    {this.renderShowButton()}
                    {this.renderHideButton()}
                    <span className="glyphicon glyphicon-plus pull-right targetButtons" onClick={() => this.props.showEditAddPanel(this.state.targetItem, "Add", true)}></span>
                    <span className="glyphicon glyphicon-pencil pull-right targetButtons" onClick={() => this.props.showEditAddPanel(this.state.targetItem, "Edit", false)}></span>
                </p>
                <p>{this.state.targetItem.length}</p>
                <p>{this.state.targetItem.points}</p>
                <button className="glyphicon glyphicon-unchecked removeButton" onClick={() => this.props.completeTarget(this.state.targetItem)}></button>
                <button className="glyphicon glyphicon-remove removeButton"></button>
            </li>
            {this.renderSubTargets()}
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
                {this.renderTarget()}
                <div className={this.descriptionPanelCssClass + " editPanel"}>
                    {this.renderDescriptionPanel()}
                </div>
            </ul>
        )
    }
}

export default TargetListItem;