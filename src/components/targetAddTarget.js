import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class TargetAddTarget extends Component {
    constructor(props) {
        super(props);

        this.state = { addOrEdit: this.props.addOrEdit, 
            subtarget: this.props.subtarget, 
            target: this.props.target,
            title: "",
            year: (new Date()).getUTCFullYear(),
            month: 0,
            day: 1,
            hour: 0,
            minute: 0,
            points: "",
            description: "" };
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillReceiveProps(props){
        this.setState({ addOrEdit: props.addOrEdit, subtarget: props.subtarget, target: props.target });
    }

    subtargetDescriptionStyle = "";

    setSubtargetMessage(){
        var message = "";
        if (this.state.subtarget){
            message = "Subtarget";
            this.subtargetDescriptionStyle = "hidden";
        }
        else if (!this.state.subtarget){
            message = "Target";
            this.subtargetDescriptionStyle = "";
        }
        return message;
    }

    closePanel(){
        this.setState({ addOrEdit: "", title: "", year: (new Date()).getUTCFullYear(), month: 0, day: 1, hour: 0, minute: 0, points: "", description: "" });
        this.props.hideEditAddPanel();
    }

    onTitleChange(title) {
        this.setState({title});
    }

    onYearChange(year) {
        this.setState({year});
    }

    onMonthChange(month) {
        this.setState({month});
    }

    onDayChange(day) {
        this.setState({day});
    }

    onHourChange(hour) {
        this.setState({hour});
    }

    onMinuteChange(minute) {
        this.setState({minute});
    }

    onPointsChange(points) {
        this.setState({points});
    }

    onDescriptionChange(description) {
        this.setState({description});
    }

    onSubmit(props){
        var dueDate = new Date(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minute);
        if(this.state.addOrEdit=="Add"){
            if(!this.props.subtarget){
                this.props.addTarget(props.title, props.points, dueDate.getTime(), props.description);
                this.closePanel();
            }
            else if(this.props.subtarget){
                this.props.addTarget(props.title, props.points, dueDate.getTime(), props.description, true, this.state.target);
                this.closePanel();
            }
        }
        else if(this.state.addOrEdit=="Edit"){
            this.state.target.editTarget(props.title, props.points, dueDate.getTime(), props.description);
            this.closePanel();
        }
    }

    renderFormPanel(){
        const { fields: { title, year, month, day, hour, minute, points, description }, handleSubmit } = this.props;
        var time = new Date();

        return(
            <div className="editPanelForm">
                <span className="glyphicon glyphicon-remove closeButton" onClick={() => this.closePanel()}></span>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <h3>{this.state.addOrEdit} {this.setSubtargetMessage()}</h3> 
                    <h4>{this.setSubtargetMessage()} title</h4>
                    <input type="text" {...title} required value={this.state.title} onChange={event => this.onTitleChange(event.target.value)} />
                    
                    
                    <h4>{this.setSubtargetMessage()} due date</h4>
                    
                    <div className="selectLabels">
                        <p>Year</p>
                        <p>Month</p>
                        <p>Day</p>
                        <p>Hour</p>
                        <p>Minute</p>
                    </div>

                    <div className="selectInputs">
                        <select name="year" {...year} value={this.state.year} onChange={event => this.onYearChange(event.target.value)}>
                            <option value={time.getUTCFullYear()}>{time.getUTCFullYear()}</option>
                            <option value={time.getUTCFullYear() + 1}>{time.getUTCFullYear() + 1}</option>
                            <option value={time.getUTCFullYear() + 2}>{time.getUTCFullYear() + 2}</option>
                            <option value={time.getUTCFullYear() + 3}>{time.getUTCFullYear() + 3}</option>
                        </select>

                        <select name="month" {...month} value={this.state.month} onChange={event => this.onMonthChange(event.target.value)}>
                            <option value={0}>January</option>
                            <option value={1}>February</option>
                            <option value={2}>March</option>
                            <option value={3}>April</option>
                            <option value={4}>May</option>
                            <option value={5}>June</option>
                            <option value={6}>July</option>
                            <option value={7}>August</option>
                            <option value={8}>September</option>
                            <option value={9}>October</option>
                            <option value={10}>November</option>
                            <option value={11}>December</option>
                        </select>

                        <select name="day" {...day} value={this.state.day} onChange={event => this.onDayChange(event.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                            <option value={16}>16</option>
                            <option value={17}>17</option>
                            <option value={18}>18</option>
                            <option value={19}>19</option>
                            <option value={20}>20</option>
                            <option value={21}>21</option>
                            <option value={22}>22</option>
                            <option value={23}>23</option>
                            <option value={24}>24</option>
                            <option value={25}>25</option>
                            <option value={26}>26</option>
                            <option value={27}>27</option>
                            <option value={28}>28</option>
                            <option value={29}>29</option>
                            <option value={30}>30</option>
                            <option value={31}>31</option>
                        </select>

                        <select name="hour" {...hour} value={this.state.hour} onChange={event => this.onHourChange(event.target.value)}>
                            <option value={0}>00</option>
                            <option value={1}>01</option>
                            <option value={2}>02</option>
                            <option value={3}>03</option>
                            <option value={4}>04</option>
                            <option value={5}>05</option>
                            <option value={6}>06</option>
                            <option value={7}>07</option>
                            <option value={8}>08</option>
                            <option value={9}>09</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                            <option value={16}>16</option>
                            <option value={17}>17</option>
                            <option value={18}>18</option>
                            <option value={19}>19</option>
                            <option value={20}>20</option>
                            <option value={21}>21</option>
                            <option value={22}>22</option>
                            <option value={23}>23</option>
                        </select>

                        <select name="minute" {...month} value={this.state.minute} onChange={event => this.onMinuteChange(event.target.value)}>
                            <option value={0}>00</option>
                            <option value={5}>05</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                            <option value={30}>30</option>
                            <option value={35}>35</option>
                            <option value={40}>40</option>
                            <option value={45}>45</option>
                            <option value={50}>50</option>
                            <option value={55}>55</option>
                        </select>
                    </div>
                    
                    <h4>{this.setSubtargetMessage()} points</h4>
                    <input type="text" {...points} required value={this.state.points} onChange={event => this.onPointsChange(event.target.value)} />
                    <h4 className={this.subtargetDescriptionStyle}>{this.setSubtargetMessage()} description</h4>
                    <textarea className={"formTA " + this.subtargetDescriptionStyle} {...description} value={this.state.description} onChange={event => this.onDescriptionChange(event.target.value)} />
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
    
        if (!values.points) {
            errors.points = 'Enter a points value for this target';
        }
    
        return errors;
}

export default reduxForm({
    form: 'TargetEditAdd',
    fields: ['title', 'year', 'month', 'day', 'hour', 'minute', 'points', 'description'],
    validate
}, null)(TargetAddTarget);