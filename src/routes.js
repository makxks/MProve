import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LoginButton from './components/loginButton';
import AuthComponent from './components/auth';
import Home from './components/home';
import Profile from './components/profile';
import Targets from './components/targets';
import Rewards from './components/rewards';
import About from './components/about';

export default (
<Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/auth/:method" component={AuthComponent} />
    <Route path="/:username/home" component={Home} />
    <Route path="/:username/profile" component={Profile} />
    <Route path="/:username/targets" component={Targets} />
    <Route path="/:username/rewards" component={Rewards} />
    <Route path="/about" component={About} />
</Route>
);