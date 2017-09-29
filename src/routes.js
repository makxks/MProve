import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LoginButton from './components/loginButton';
import Auth from './components/auth';
import Home from './components/home';
import Profile from './components/profile';
import Targets from './components/targets';
import Rewards from './components/rewards';

export default (
<Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/auth/:method" component={Auth} />
    <Route path="/:user/home" component={Home} />
    <Route path="/:user/profile" component={Profile} />
    <Route path="/:user/targets" component={Targets} />
    <Route path="/:user/rewards" component={Rewards} />
</Route>
);