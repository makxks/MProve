import React, { Component } from 'react';
import Subtarget from '../models/subtarget';
import User from '../models/user';

class TargetListSubItemComplete extends Component {
    constructor(props) {
        super(props);

        this.state = { completed: props.subTarget.completed };

        this.completeSubtask = this.completeSubtask.bind(this);
        this.unCompleteSubtask = this.unCompleteSubtask.bind(this);
        this.renderCompleteButton = this.renderCompleteButton.bind(this);
        this.renderItemName = this.renderItemName.bind(this);
        this.renderItemPoints = this.renderItemPoints.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({ completed: props.subTarget.completed })
    }

    completeSubtask(){
        this.props.completeSubTarget(this.props.subTarget, true);
        this.props.subTarget.completed = true;
        this.props.subTarget.completeUncompleteSubtarget(true);
        var points = parseInt(localStorage.getItem('points')) + parseInt(this.props.subTarget.points);
        
        localStorage.setItem('points', points);
        localStorage.setItem('totalPoints', parseInt(localStorage.getItem('totalPoints')) + parseInt(points));

        var user = new User(localStorage.getItem('email'), localStorage.getItem('username'), localStorage.getItem('points'));
        user.addPoints(this.props.subTarget.points);
        this.setState({ completed: true });
    }

    unCompleteSubtask(){
        this.props.uncompleteSubTarget(this.props.subTarget, true);
        this.props.subTarget.completed = false;
        this.props.subTarget.completeUncompleteSubtarget(false);
        var points = parseInt(localStorage.getItem('points')) - parseInt(this.props.subTarget.points);
        
        localStorage.setItem('points', points);
        localStorage.setItem('totalPoints', parseInt(localStorage.getItem('totalPoints')) - parseInt(points));
       
        var user = new User(localStorage.getItem('email'), localStorage.getItem('username'), localStorage.getItem('points'));
        user.usePoints(this.props.subTarget.points);
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
        return(
            <p> {this.props.subTarget.name}
            </p>
        )
    }

    renderItemPoints(){
        return(
            <p>{this.props.subTarget.points}</p>
        )
    }

    render(){
        var cssClass = "";
        if(this.state.completed){
            cssClass = "fade ";
        }
        else if(!this.state.completed){
            cssClass = "";
        }
        return(
            <li className={cssClass + " listItem subListItem subListItemComplete"}>
                {this.renderItemName()}
                {this.renderItemPoints()}
                {this.renderCompleteButton()}
                <button className="glyphicon glyphicon-remove removeButton buttonComplete" onClick={() => this.props.removeTarget(this.props.subTarget)}></button>
            </li>
        )
    }
}

export default TargetListSubItemComplete;