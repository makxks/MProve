import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Error extends Component {
    
    render() {
        return(
            <div className="authForm">
                <h4>An unexpected error occurred</h4>
                <hr />
                <h4>Please refresh the application and try again</h4>
            </div>
        )
    };
}

export default Error;