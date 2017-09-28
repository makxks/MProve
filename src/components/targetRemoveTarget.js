import React, { Component } from 'react';

class TargetRemoveTarget extends Component {
    constructor(props) {
        super(props);

        this.state = {target: this.props.target};
    }

    componentWillReceiveProps(props){
        this.setState({ target: props.target });
    }

    removeThisTarget(){
        this.props.removeTarget(this.state.target);
        this.setState({ target: null });
        this.props.hideEditAddPanel();
    }

    renderPanel(){
        return(
            <div>
                <span className="glyphicon glyphicon-remove closeButton" onClick={() => this.props.hideEditAddPanel()}></span>
                <h3>Are you sure you want to delete this target (and all it's subtargets)?</h3>
                <button type="submit" className="buttonForm" onClick={() => this.props.removeTarget(this.state.target)}>Yes</button>
                <button type="submit" className="buttonForm" onClick={() => this.props.hideEditAddPanel()}>No</button>
            </div>      
        )
    }

    render() {
        return ( 
            <div className="editPanel">
                {this.renderPanel()}
            </div>
        )
    };

}

export default TargetRemoveTarget;