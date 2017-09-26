import React, { Component } from 'react';

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
        this.props.subTarget.completed = true;
        this.setState({ completed: true });
    }

    unCompleteSubtask(){
        this.props.subTarget.completed = false;
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
            cssClass = "fade";
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