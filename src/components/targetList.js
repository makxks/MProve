import React, { Component, PropTypes } from 'react';
import Target from '../models/target';
import Subtarget from '../models/subtarget';
import User from '../models/user';
import TargetListItem from './targetListItem';
import TargetListItemComplete from './targetListItemComplete';
import TargetAddTarget from './targetAddTarget';
import TargetRemoveTarget from './targetRemoveTarget';
import { connect } from 'react-redux';
import { fetchTargets } from '../actions/index';
import { fetchSubtargets } from '../actions/index';
import Auth from '../auth/auth';

class TargetList extends Component {
    auth = new Auth;

    constructor(props) {
        super(props);

        this.state = { unCompletedTargets: [], completedTargets: [], panelTarget: null, panelFunction: "Add", panelTargetIsSub: false };

        this.renderListHeadings = this.renderListHeadings.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.renderList = this.renderList.bind(this);
        this.setTargetComplete = this.setTargetComplete.bind(this);
        this.setTargetUncomplete = this.setTargetUncomplete.bind(this);

        this.showEditAddPanel = this.showEditAddPanel.bind(this);
        this.hideEditAddPanel = this.hideEditAddPanel.bind(this);
        this.renderTargetPanel = this.renderTargetPanel.bind(this);
        this.renderRemovePanel = this.renderRemovePanel.bind(this);    
        this.showRemovePanel = this.showRemovePanel.bind(this);
        this.hideRemovePanel = this.hideRemovePanel.bind(this);
        this.addTarget = this.addTarget.bind(this);
        this.removeTarget = this.removeTarget.bind(this);
    }
    
    panelCssClass = "hidden";
    removePanelCssClass = "hidden";

    componentWillMount() {
        var tempCompleted = [];
        var tempUncompleted = [];

        this.props.fetchTargets(localStorage.getItem('email'))
            .then((response) => {
                if(response.payload){
                    for(var i=0; i<response.payload.length; i++){
                        var newTarget = new Target(
                            response.payload[i].name,
                            response.payload[i].points,
                            response.payload[i].length,
                            response.payload[i].user,
                            response.payload[i].description,
                            response.payload[i].complete,
                            []
                        );
                        if(!response.payload[i].completed){
                            tempUncompleted.push(newTarget);
                        }
                        else{
                            tempCompleted.push(newTarget);
                        }
                        var locali = i;
                        this.props.fetchSubtargets(localStorage.getItem('email'), response.payload[locali].name)
                        .then((response1) => {
                            if(response1.payload){
                                for(var j=0; j<response1.payload.length; j++){
                                    var newSubtarget = new Subtarget(
                                        response1.payload[j].name,
                                        response1.payload[j].points,
                                        response1.payload[j].length,
                                        response1.payload[j].parentName,
                                        response1.payload[j].user,
                                        response1.payload[j].description,
                                        response1.payload[j].completed
                                    )
                                    for(var k = 0; k<tempUncompleted.length; k++){
                                        if(response1.payload[j].parentName == tempUncompleted[k].name){
                                            tempUncompleted[k].subtargets.push(newSubtarget);
                                        }
                                    }
                                    for(var l = 0; l<tempCompleted.length; l++){
                                        if(response1.payload[j].parentName == tempCompleted[l].name){
                                            tempCompleted[l].subtargets.push(newSubtarget);
                                        }
                                    }
                                }
                            }
                            
                            this.setState({ unCompletedTargets: tempUncompleted, completedTargets: tempCompleted });
                        });
                    }
                }
            })
    }

    setTargetComplete(target, isSubtarget=false){
        if(isSubtarget){
            this.setState({ unCompletedTargets: this.state.unCompletedTargets });
        }
        else{
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
            target.completeUncompleteTarget(true);
            var points = parseInt(localStorage.getItem('points')) + parseInt(target.points);
            
            localStorage.setItem('points', points);
            localStorage.setItem('targetsReached', parseInt(localStorage.getItem('targetsReached')) + 1);
            localStorage.setItem('totalPoints', parseInt(localStorage.getItem('totalPoints')) + target.points);

            var user = new User(localStorage.getItem('email'), localStorage.getItem('username'), localStorage.getItem('points'));
            user.addPoints(target.points);
            this.setState({ unCompletedTargets: tempUncompleted, completedTargets: tempCompleted });
        }
    }

    setTargetUncomplete(target, isSubtarget=false){
        if(isSubtarget){
            this.setState({ unCompletedTargets: this.state.unCompletedTargets });
        }
        else{
            var tempUncompleted = [];
            var tempCompleted = [];
            tempCompleted = this.state.completedTargets;
            tempUncompleted = this.state.unCompletedTargets;
            tempUncompleted.push(target);
            for(var i=0; i<tempCompleted.length; i++){
                if(tempCompleted[i] == target){
                    tempCompleted.splice(i,1);
                    break;
                }
            }
            target.completeUncompleteTarget(false);
            var points = parseInt(localStorage.getItem('points')) - parseInt(target.points);
            
            localStorage.setItem('points', points);
            localStorage.setItem('targetsReached', parseInt(localStorage.getItem('targetsReached')) - 1);
            localStorage.setItem('totalPoints', parseInt(localStorage.getItem('totalPoints')) - target.points);

            var user = new User(localStorage.getItem('email'), localStorage.getItem('username'), localStorage.getItem('points'));
            user.usePoints(target.points);
            this.setState({ unCompletedTargets: tempUncompleted, completedTargets: tempCompleted });
        }
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
        if(!isSubtarget){
            var newTarget = new Target(title, points, length, localStorage.getItem('username'), description);
            var tempTargetArray = this.state.unCompletedTargets;
            tempTargetArray.push(newTarget);
            newTarget.createDBTarget();
            this.setState({ unCompletedTargets: tempTargetArray });
        }
        else if(isSubtarget){
            var tempTargets = this.state.unCompletedTargets;
            var newSubtarget = new Subtarget(title, points, length, subtargetParent.name, localStorage.getItem('username'), description, false);
            newSubtarget.addDBSubtarget();
            subtargetParent.subtargets.push(newSubtarget);
            for(var i=0; i<tempTargets.length; i++){
                if(subtargetParent.name == tempTargets[i].name){
                    tempTargets[i] = subtargetParent;
                }
            }
            this.setState({ unCompletedTargets: tempTargets });
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
        var tempCompletedList = this.state.completedTargets;
        target.deleteTarget();
        for(var i=0; i<target.subtargets.length; i++){
            target.subtargets.splice(i,1);
        }
        for(var i=0; i<tempList.length; i++){
            if(tempList[i] == target){
                tempList.splice(i,1);
            }
        }
        for(var i=0; i<tempCompletedList.length; i++){
            if(tempCompletedList[i] == target){
                tempCompletedList.splice(i,1);
            }
        }
        this.setState({ unCompletedTargets: tempList });
        this.setState({ completedTargets: tempCompletedList });
    }

    renderListHeadings(){
        return (
            <li className="listItem headings">
                <p>Target</p>
                <p>Due Date</p>
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
                uncompleteTarget={this.setTargetUncomplete}
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
            rows.push(<TargetListItemComplete 
                targetItem={this.state.completedTargets[i]}
                completeTarget={this.setTargetComplete}
                uncompleteTarget={this.setTargetUncomplete} 
                showRemovePanel={this.showRemovePanel}
                hideRemovePanel={this.hideRemovePanel} 
                key={i} />);
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

function mapStateToProps(state) {
    return { targets: state.targets.all, subtargets: state.subtargets.all };
};

export default connect(mapStateToProps, { fetchTargets, fetchSubtargets })(TargetList);