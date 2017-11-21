import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import LoginButton from './loginButton';
import Auth from '../auth/auth';

class About extends Component {
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

    goHome() {
        this.context.router.push('/');
    }

    render() {
        return(
            <div className="aboutContainer">
                <button className="aboutButton" onClick={this.goHome.bind(this)}>Go Home</button>
                <div className="aboutDescription">
                    <div className="aboutSection">
                        <div className="narrow">
                            <p>Although it may seem like a very simple to do list application, MProve is actually aimed at
                            helping you achieve the bigger goals. Not the things you have to do, or the things you need to do, but the things
                            you want to do.
                            </p>
                        </div>
                    </div>
                    <div className="aboutSection">
                        <div>
                            <p>You can add targets to your list in the target section and add a "due date" and a points value to each of them. You can add however many points you
                            want to a target, 1... 10... 1000000, it is totally up to you, however it will work best if you decide on a sensible value (relative to the points 
                            cost of your rewards).
                            </p>
                        </div>
                        <div>
                            <img src={'/images/targets..png'} width="549px" height="262px"></img>
                        </div>
                    </div>
                    <div className="aboutSection">
                        <div>
                            <img src={'/images/rewards..png'} width="525px" height="225px"></img>
                        </div>
                        <div>
                            <p>You can also add some rewards if you want to. Again these should be things you want, not things you need. Once you have earned enough points you can
                                "claim" the rewards, whatever they may be, and give them to yourself.
                            </p>
                        </div>
                    </div>
                    <div className="aboutSection">
                        <div className="narrow">
                            <p>The idea is that if you apply values according to the importance of each target to you, and then give a relative value to the rewards,
                                the rewards may help to revitalize your efforts when you are feeling less than inspired to continue towards your target. So by giving points values to the
                                targets and the rewards you can follow through with these things and give yourself something you want for your efforts. MProve aims to help people achieve
                                some of the long-standing goals that they want to reach but that sometimes fall by the wayside. By using a points system that suits you, you should be able
                                to achieve the intrinsic rewards of your goals while incentivizing yourself extrinsically.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default About;