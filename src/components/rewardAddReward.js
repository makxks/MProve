import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class RewardAddReward extends Component{
    constructor(props) {
        super(props);

        this.state = { addOrEdit: this.props.addOrEdit,
            reward: this.props.reward,
            title: "",
            points: "",
            description: "" };
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillReceiveProps(props){
        this.setState({ addOrEdit: props.addOrEdit, reward: props.reward });
    }

    closePanel(){
        this.setState({ addOrEdit: "", title: "", points: "", description: "" });
        this.props.hideEditAddPanel();
    }

    onTitleChange(title) {
        this.setState({title});
    }

    onPointsChange(points) {
        this.setState({points});
    }

    onDescriptionChange(description) {
        this.setState({description});
    }

    onSubmit(props){
        if(this.state.addOrEdit=="Add"){
            this.props.addReward(props.title, props.points, props.description);
            this.closePanel();
        }
        else if(this.state.addOrEdit=="Edit"){
            this.state.reward.editReward(props.title, props.points, props.description);
            this.closePanel();
        }
    }


    renderFormPanel(){
        const { fields: { title, points, description }, handleSubmit } = this.props;

        return(
            <div>
                <span className="glyphicon glyphicon-remove closeButton" onClick={() => this.closePanel()}></span>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>{this.state.addOrEdit} Reward</h3>
                    <h4>Reward name</h4>
                    <input type="text" {...title} required value={this.state.title} onChange={event => this.onTitleChange(event.target.value)} />
                    <h4>Reward points</h4>
                    <input type="text" {...points} required value={this.state.points} onChange={event => this.onPointsChange(event.target.value)} />
                    <h4>Reward description</h4>
                    <input type="text" {...description} required value={this.state.description} onChange={event => this.onDescriptionChange(event.target.value)} />
                    <button type="submit" className="buttonForm">{this.state.addOrEdit}</button> 
                </form>
            </div>      
        )
    }

    render() {
        return ( 
            <div className="editPanel">
                {this.renderFormPanel()}
            </div>
        )
    };
}

function validate(values) {
    const errors = {};
    
        if (!values.title) {
            errors.title = 'Enter a title for this reward';
        }
    
        if (!values.points) {
            errors.points = 'Enter the points value of this reward';
        }

        if (!values.description) {
            errors.description = 'Enter a description for this reward';
        }
    
        return errors;
}

export default reduxForm({
    form: 'RewardEditAdd',
    fields: ['title', 'points', 'description'],
    validate
}, null)(RewardAddReward);