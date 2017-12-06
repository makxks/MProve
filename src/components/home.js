import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import LoginButton from './loginButton';
import Auth from '../auth/auth';

class Home extends Component {
    auth = new Auth();

    constructor(props) {
        super(props);

        this.state = { loggedIn: this.auth.isAuthenticated() };
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount(){
        this.setState({ loggedIn: this.auth.isAuthenticated() })
    }

    goToTargets() {
        this.context.router.push('/' + localStorage.getItem('username') + '/targets');
    }

    goToRewards() {
        this.context.router.push('/' + localStorage.getItem('username') + '/rewards');
    }

    goToProfile() {
        this.context.router.push('/' + localStorage.getItem('username') + '/profile');
    }

    goToAbout() {
        this.context.router.push('/about');
    }

    renderHomePage(){
        if(!this.auth.isAuthenticated()){
            return(
                <LoginButton />
            )
        }
        else{
            return ( 
                <div className="mainButtonGroup">
                    <button 
                        className="mainButton"
                        onClick={this.goToTargets.bind(this)}>
                        Targets
                    </button>
                    <button 
                        className="mainButton"
                        onClick={this.goToRewards.bind(this)}>
                        Rewards
                    </button>
                    <button 
                        className="mainButton"
                        onClick={this.goToProfile.bind(this)}>
                        Profile
                    </button>
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                <button className="aboutButton" onClick={this.goToAbout.bind(this)}>About The Site</button>
                {this.renderHomePage()}
            </div>
        )
    };
}

export default Home;