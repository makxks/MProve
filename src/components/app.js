import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Auth from '../auth/auth';
import Home from './home';
import ErrorBoundary from './errorBoundary';

export default class App extends Component {
  auth = new Auth();

  static contextTypes = {
    router: PropTypes.object
  };

  goHome(){
    this.context.router.push('/');
  }

  render() {
    return (
      <div className="appContainer">
        <div className="title">
          <div className="mMask logoImage"><img src={'/images/m4..png'} width="100.5" height="133.5px" className="m" onClick={this.goHome.bind(this)}></img></div><h1 className="logo">PROVE</h1>
          <div className="tagline">
            <p>Set your own targets.</p>
            <p>Apply your own values.</p>
            <p>Reap your own rewards.</p>
          </div>
        </div>
        <div className="container">
          <ErrorBoundary>
            {this.props.children}
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}
