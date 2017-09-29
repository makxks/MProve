import React, { Component } from 'react';

class TargetRemoveTarget extends Component {
    constructor(props) {
        super(props);

        this.state = {target: this.props.target};

        this.removeThisTarget = this.removeThisTarget.bind(this)
    }

    componentWillReceiveProps(props){
        this.setState({ target: props.target });
    }

    removeThisTarget(){
        this.props.removeTarget(this.state.target);
        this.setState({ target: null });
        this.props.hideRemovePanel();
    }

    renderPanel(){
        return(
            <div>
                <span className="glyphicon glyphicon-remove closeButton" onClick={() => this.props.hideRemovePanel()}></span>
                <div className="removePanelContents">
                <h3>Are you sure you want to delete this target (and all it's subtargets)?</h3>
                <button type="submit" className="buttonForm" onClick={() => this.removeThisTarget()}>Yes</button>
                <button type="submit" className="buttonForm" onClick={() => this.props.hideRemovePanel()}>No</button>
                </div>
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