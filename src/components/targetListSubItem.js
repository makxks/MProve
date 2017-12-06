import React, { Component } from 'react';
import Subtarget from '../models/subtarget';
import User from '../models/user';

class TargetListSubItem extends Component {
    constructor(props) {
        super(props);

        this.state = { completed: props.subTarget.completed, overdue: ((props.subTarget.length) < (new Date())) };

        this.completeSubtask = this.completeSubtask.bind(this);
        this.unCompleteSubtask = this.unCompleteSubtask.bind(this);
        this.renderCompleteButton = this.renderCompleteButton.bind(this);
        this.renderItemName = this.renderItemName.bind(this);
        this.renderItemLength = this.renderItemLength.bind(this);
        this.renderItemPoints = this.renderItemPoints.bind(this);
    }

    overduePanelStyle = "";

    componentWillReceiveProps(props){
        this.setState({ completed: props.subTarget.completed });
        var time = new Date();
        if(props.subTarget.length < time){
            this.setState({ overdue: true });
        }
        else{
            this.setState({ overdue: false });
        }
        if(props.subTarget.length < time && !props.subTarget.completed){
            this.overduePanelStyle = "overduePanelSub";
        }
        else{
            this.overduePanelStyle = "";
        }
    }

    componentWillMount(){
        var time = new Date();
        if(this.props.subTarget.length < time){
            this.setState({ overdue: true });
            if(!this.state.completed){
                this.overduePanelStyle = "overduePanelSub";
            }
            else {
                this.overduePanelStyle = "";
            }
        }
        else{
            this.setState({ overdue: false });
            this.overduePanelStyle = "";
        }
    }

    completeSubtask(){
        this.props.completeSubTarget(this.props.subTarget, true);
        this.props.subTarget.completed = true;
        this.props.subTarget.completeUncompleteSubtarget(true);
        var points = parseInt(localStorage.getItem('points')) + parseInt(this.props.subTarget.points);
        
        localStorage.setItem('points', points);
        localStorage.setItem('totalPoints', parseInt(localStorage.getItem('totalPoints')) + parseInt(this.props.subTarget.points));

        var user = new User(localStorage.getItem('email'), localStorage.getItem('username'), localStorage.getItem('points'));
        user.addPoints(parseInt(this.props.subTarget.points));
        this.setState({ completed: true, overdue: false });
        this.overduePanelStyle = "";
    }

    unCompleteSubtask(){
        this.props.uncompleteSubTarget(this.props.subTarget, true);
        this.props.subTarget.completed = false;
        this.props.subTarget.completeUncompleteSubtarget(false);
        var points = parseInt(localStorage.getItem('points')) - parseInt(this.props.subTarget.points);
        
        localStorage.setItem('points', points);
        localStorage.setItem('totalPoints', parseInt(localStorage.getItem('totalPoints')) - parseInt(this.props.subTarget.points));

        var user = new User(localStorage.getItem('email'), localStorage.getItem('username'), localStorage.getItem('points'));
        user.usePoints(parseInt(this.props.subTarget.points));
        var time = new Date();
        if(this.props.subTarget.length < time){
            this.setState({ overdue: true });
            this.overduePanelStyle = "overduePanelSub";
        }
        else{
            this.setState({ overdue: false });
            this.overduePanelStyle = "";
        }
        this.setState({ completed: false });
    }

    renderCompleteButton(){
        if(this.state.completed){
            return (
                <button className="glyphicon glyphicon-check removeButton" onClick={() => this.unCompleteSubtask()}></button>
            )
        }
        else if(!this.state.completed){
            return (
                <button className="glyphicon glyphicon-unchecked removeButton" onClick={() => this.completeSubtask()}></button>
            )
        }
    }

    renderItemName(){
        var time = new Date();
        if((this.props.subTarget.length < time) && !this.state.completed){
            return(
                <p><b> {this.props.subTarget.name} </b>
                    <span className="glyphicon glyphicon-pencil pull-right targetButtons" onClick={() => this.props.showEditAddPanel(this.props.subTarget, "Edit", true)}></span>
                </p>
            )
        }
        else{
            return(
                <p> {this.props.subTarget.name}
                    <span className="glyphicon glyphicon-pencil pull-right targetButtons" onClick={() => this.props.showEditAddPanel(this.props.subTarget, "Edit", true)}></span>
                </p>
            )
        }
    }

    pad(num, size) {
		var s = num+"";
		while(s.length < size){
			s = "0" + s;
		}
		return s;
	}

    renderItemLength(){
        var time = new Date();
        var due = new Date(this.props.subTarget.length);
        var dateMessage = due.toLocaleDateString() + " " + this.pad(due.getHours(),2) + ":" + this.pad(due.getMinutes(),2);
        if(this.props.subTarget.length < time && !this.state.completed){
            return(
                <p className={this.overdueStyle}><b>!! {dateMessage} !!</b></p>
            )
        }
        else{
            return(
                <p>{dateMessage}</p>
            )
        }
    }

    renderItemPoints(){
        return(
            <p>{this.props.subTarget.points}</p>
        )
    }
    

    render(){
        var cssClass = "";
        if(this.state.completed){
            cssClass = "fade";

        }
        else if(!this.state.completed){
            cssClass = "";
        }
        return(
            <li className={cssClass + " " + this.overduePanelStyle +  " listItem subListItem"}>
                {this.renderItemName()}
                {this.renderItemLength()}
                {this.renderItemPoints()}
                {this.renderCompleteButton()}
                <button className="glyphicon glyphicon-remove removeButton" onClick={() => this.props.removeTarget(this.props.subTarget)}></button>
            </li>
        )
    }
    
}

export default TargetListSubItem;