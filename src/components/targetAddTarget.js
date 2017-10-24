import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class TargetAddTarget extends Component {
    constructor(props) {
        super(props);

        this.state = { addOrEdit: this.props.addOrEdit, 
            subtarget: this.props.subtarget, 
            target: this.props.target,
            title: "",
            length: "",
            points: "",
            description: "" };
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillReceiveProps(props){
        this.setState({ addOrEdit: props.addOrEdit, subtarget: props.subtarget, target: props.target });
    }

    setSubtargetMessage(){
        var message = "";
        if (this.state.subtarget){
            message = "Subtarget";
        }
        else if (!this.state.subtarget){
            message = "Target";
        }
        return message;
    }

    closePanel(){
        this.setState({ addOrEdit: "", title: "", length: "", points: "", description: "" });
        this.props.hideEditAddPanel();
    }

    onTitleChange(title) {
        this.setState({title});
    }

    onLengthChange(length) {
        this.setState({length});
    }

    onPointsChange(points) {
        this.setState({points});
    }

    onDescriptionChange(description) {
        this.setState({description});
    }

    onSubmit(props){
        if(this.state.addOrEdit=="Add"){
            if(!this.props.subtarget){
                this.props.addTarget(props.title, props.points, props.length, props.description);
                this.closePanel();
            }
            else if(this.props.subtarget){
                this.props.addTarget(props.title, props.points, props.length, props.description, true, this.state.target);
                this.closePanel();
            }
        }
        else if(this.state.addOrEdit=="Edit"){
            this.state.target.editTarget(props.title, props.points, props.length, props.description);
            this.closePanel();
        }
    }

    renderFormPanel(){
        const { fields: { title, length, points, description }, handleSubmit } = this.props;

        return(
            <div>
                <span className="glyphicon glyphicon-remove closeButton" onClick={() => this.closePanel()}></span>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>{this.state.addOrEdit} {this.setSubtargetMessage()}</h3> 
                    <h4>{this.setSubtargetMessage()} title</h4>
                    <input type="text" {...title} required value={this.state.title} onChange={event => this.onTitleChange(event.target.value)} />
                    <h4>{this.setSubtargetMessage()} length</h4>
                    <input type="text" {...length} required value={this.state.length} onChange={event => this.onLengthChange(event.target.value)} />
                    <h4>{this.setSubtargetMessage()} points</h4>
                    <input type="text" {...points} required value={this.state.points} onChange={event => this.onPointsChange(event.target.value)} />
                    <h4>{this.setSubtargetMessage()} description</h4>
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
            errors.title = 'Enter a title for this target';
        }
    
        if(!values.length) {
            errors.length = 'Enter the lenth of time for this target';
        }
    
        if (!values.points) {
            errors.points = 'Enter a points value for this target';
        }

        if (!values.description){
            errors.description = 'Enter a description for this target';
        }
    
        return errors;
}

export default reduxForm({
    form: 'TargetEditAdd',
    fields: ['title', 'length', 'points', 'description'],
    validate
}, null)(TargetAddTarget);