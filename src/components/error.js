import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Error extends Component {
    
    render() {
        return(
            <div className="editPanel">
                <div className="errorPanel">
                    <h2>An unexpected error occurred</h2>
                    <hr />
                    <h3>Your login details may be incorrect</h3>
                    <h3>Please refresh the application and try again</h3>
                </div>
            </div>
        )
    };
}

export default Error;