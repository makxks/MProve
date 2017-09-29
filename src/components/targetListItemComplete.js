import React, { Component, PropTypes } from 'react';
import Target from '../models/target';
import TargetListSubItemComplete from './targetListSubItemComplete';

class TargetListItemComplete extends Component {
    constructor(props) {
        super(props);

        this.state = { targetItem: props.targetItem, showingSubtasks: true };

        this.renderTarget = this.renderTarget.bind(this);
        this.renderSubTargets = this.renderSubTargets.bind(this);
        this.removeSubTarget = this.removeSubTarget.bind(this);
        this.showSubList = this.showSubList.bind(this);
        this.hideSubList = this.hideSubList.bind(this);
        this.renderShowButton = this.renderShowButton.bind(this);
        this.renderHideButton = this.renderHideButton.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({ targetItem: props.targetItem });
    }

    showSubList(){
        this.setState({ showingSubtasks: true });
    }

    hideSubList(){
        this.setState({ showingSubtasks: false });
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

    renderSubTargets(){
        var rows = [];
        for(var i=0; i<this.state.targetItem.subtargets.length; i++){
            rows.push(<TargetListSubItemComplete subTarget={this.state.targetItem.subtargets[i]} removeTarget={this.removeSubTarget} key={i} />);
        }
        var cssClass = "";
        if(this.state.showingSubtasks){
            cssClass = "subListComplete"
        }
        else if(!this.state.showingSubtasks){
            cssClass = "subListComplete hidden"
        }
        return(
            <ul className={cssClass}>
                {rows}
            </ul>
        )
    }

    removeSubTarget(subtarget){
        var targets = this.state.targetItem.subtargets;
        for(var i=0; i<targets.length; i++){
            if(targets[i] == subtarget){
                targets.splice(i,1);
                break;
            }
        }
        var tempTargetItem = this.state.targetItem;
        tempTargetItem.subtargets = targets;
        this.setState({ targetItem: tempTargetItem });
    }

    renderTarget(){
        return(
        <ul className="completeListItem">
            <li className="listItem listItemComplete">
                <p>{this.state.targetItem.name}
                    {this.renderShowButton()}
                    {this.renderHideButton()}
                </p>
                <p>{this.state.targetItem.points}</p>
                <button className="glyphicon glyphicon-check removeButton buttonComplete" onClick={() => this.props.uncompleteTarget(this.state.targetItem)}></button>
                <button className="glyphicon glyphicon-remove removeButton buttonComplete" onClick={() => this.props.showRemovePanel(this.state.targetItem)}></button>
            </li>
            {this.renderSubTargets()}
        </ul>
        )
    }

    render(){
        return (
            <ul className="mainListItemContainer">
                {this.renderTarget()}
            </ul>
        )
    }
}

export default TargetListItemComplete;