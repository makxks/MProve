import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render() {
    return (
      <div className="appContainer">
        <div className="title">
          <Link to={"/"} className="logo"><h1>MPROVE</h1></Link>
          <div className="tagline">
            <p>Set your own targets.</p>
            <p>Apply your own values.</p>
            <p>Reap your own rewards.</p>
          </div>
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
