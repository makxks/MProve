import React, { Component, PropTypes } from 'react';
import Target from '../models/target';
import TargetListItem from './targetListItem';
import TargetListItemComplete from './targetListItemComplete';
import TargetAddTarget from './targetAddTarget';

class TargetList extends Component {
    constructor(props) {
        super(props);

        this.state = { unCompletedTargets: [], completedTargets: [], panelTarget: null, panelFunction: "Add", panelTargetIsSub: false };

        this.renderListHeadings = this.renderListHeadings.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.renderList = this.renderList.bind(this);
        this.setTargetComplete = this.setTargetComplete.bind(this);
        this.setTargetUncomplete = this.setTargetUncomplete.bind(this);

        this.showEditAddPanel = this.showEditAddPanel.bind(this);
        this.addTarget = this.addTarget.bind(this);
        this.renderTargetPanel = this.renderTargetPanel.bind(this);
        this.hideEditAddPanel = this.hideEditAddPanel.bind(this);
        this.showRemovePanel = this.showRemovePanel.bind(this);
        this.hideRemovePanel = this.hideRemovePanel.bind(this);
        this.removeTarget = this.removeTarget.bind(this);
    }

    panelCssClass = "hidden";
    removePanelCssClass = "hidden";

    setTargetComplete(target){
        var tempUncompleted = [];
        var tempCompleted = [];
        tempCompleted = this.state.completedTargets;
        tempUncompleted = this.state.unCompletedTargets;
        tempCompleted.push(target);
        for(var i=0; i<tempUncompleted.length; i++){
            if(tempUncompleted[i] == target){
                tempUncompleted.splice(i,1);
                break;
            }
        }
        this.setState({ unCompletedTargets: tempUncompleted, completedTargets: tempCompleted });
    }

    setTargetUncomplete(target){
        var tempUncompleted = [];
        var tempCompleted = [];
        tempCompleted = this.state.completedTargets.slice();
        tempUncompleted = this.state.unCompletedTargets.slice();
        tempUncompleted.push(target);
        for(var i=0; i<tempCompleted.length; i++){
            if(tempCompleted[i] == target){
                tempCompleted.splice(i,1);
                break;
            }
        }
        this.setState({ unCompletedTargets: tempUncompleted, completedTargets: tempCompleted });
    }

    showEditAddPanel(target, addOrEdit, isSub){
        this.setState({ panelTarget: target });
        this.setState({ panelFunction: addOrEdit });
        this.setState({ panelTargetIsSub: isSub });
        this.panelCssClass = "";
    }

    hideEditAddPanel(){
        this.setState({ panelTarget: null });
        this.panelCssClass = "hidden";
    }

    showRemovePanel(target){
        this.setState({ panelTarget: target });
        this.removePanelCssClass = "";
    }

    hideRemovePanel(){
        this.setState({ panelTarget: null });
        this.removePanelCssClass = "hidden";
    }

    addTarget(title, points, length, description, isSubtarget=false, subtargetParent=null){
        var newTarget = new Target(title, points, length, description);
        if(!isSubtarget){
            var tempTargetArray = this.state.unCompletedTargets;
            tempTargetArray.push(newTarget);
            this.setState({ unCompletedTargets: tempTargetArray });
        }
        else if(isSubtarget){
            subtargetParent.addSubtask(newTarget);        
        }
    }

    renderTargetPanel(){
        return(
            <div className={this.panelCssClass}>
                <TargetAddTarget
                    addTarget={this.addTarget}
                    addOrEdit={this.state.panelFunction}
                    subtarget={this.state.panelTargetIsSub}
                    target={this.state.panelTarget} 
                    hideEditAddPanel={this.hideEditAddPanel} />
            </div>
        )
    }

    renderRemovePanel(){
        return(
            <div className={this.removePanelCssClass}>
                <TargetRemoveTarget
                    target={this.state.panelTarget}
                    hideRemovePanel={this.hideRemovePanel}
                    removeTarget={this.removeTarget} />
            </div>
        )
    }

    removeTarget(target){
        var tempList = this.state.unCompletedTargets;
        for(var i=0; i<target.subtargets.length; i++){
            target.subtargets.splice(i,1);
        }
        for(var i=0; i<tempList.length; i++){
            if(tempList[i] == target){
                tempList.splice(i,1);
            }
        }
        this.setState({ unCompletedTargets: tempList });
    }

    renderListHeadings(){
        return (
            <li className="listItem headings">
                <p>Target</p>
                <p>Time Remaining</p>
                <p>Points</p>
                <p>Complete</p>
                <p>Delete</p>
            </li>
        )
    }

    renderCompletedListHeadings(){
        return (
            <li className="headingsComplete">
                <p>Target</p>
                <p>Points</p>
                <p>Uncomplete</p>
                <p>Delete</p>
            </li>
        )
    }

    renderListItems(){      
        var rows = [];
        for(var i=0; i<this.state.unCompletedTargets.length; i++){
            rows.push(<TargetListItem 
                targetItem={this.state.unCompletedTargets[i]} 
                completeTarget={this.setTargetComplete}
                showRemovePanel={this.showRemovePanel}
                hideRemovePanel={this.hideRemovePanel}
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
        for(var i=0; i<this.state.completedTargets.length; i++){
            rows.push(<TargetListItemComplete targetItem={this.state.completedTargets[i]} uncompleteTarget={this.setTargetUncomplete} key={i} />);
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
                {this.renderTargetPanel()}
                {this.renderRemovePanel()}
                {this.renderList()}
                <button className="button" onClick={() => {this.showEditAddPanel(null, "Add", false)}}>Add new target</button>
                <hr />
                <h3>Completed</h3>
                {this.renderCompletedList()}
            </div>
        )
    };
}

export default TargetList;