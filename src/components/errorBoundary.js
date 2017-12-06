import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
    if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
        <div className={"editPanel"}>
            <div className="errorPanel">
                <h2>An error occurred</h2>
                <hr />
                <h4>Please refresh the app and try again</h4>
            </div>
        </div>
        )
    }
    return this.props.children;
    }
}

export default ErrorBoundary;