import auth0 from 'auth0-js';
import axios from 'axios';
import User from '../models/user';
import createHistory from 'history/lib/createBrowserHistory';
import AuthComponent from '../components/auth';
import { EventEmitter } from 'events';

const history = createHistory({
  forceRefresh: true
});

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'makks.eu.auth0.com',
    clientID: 'HKr7PTMYONRlzbHZEN3DQ7O3nVjPqedX',
    redirectUri: 'https://mprove.herokuapp.com/home',
    responseType: 'token id_token'
  });

  errorOccurred = new EventEmitter();

  error(error) {
    this.errorOccurred.emit('error', error)
  }

  goHome(username) {
    history.push('/' + username + '/home');
  }

  loggedInUser = "";
  emailVerified = false;

  constructor() {
    if(localStorage.getItem('access_token')){
      if(localStorage.getItem('user')){
        this.loggedInUser = localStorage.getItem('user');
      }
      this.auth0.client.userInfo(localStorage.getItem('access_token'), (err, user) => {
        if(err){
          this.loggedInUser = "";
          var errorCode = err.code;
          var errorMessage = err.message;
          this.error(err).bind(this);
        }
        if(user){
          this.loggedInUser = user.email;
          //readd later after fully checked and tested
          this.emailVerified = user.email_verified;
        }
      });
    }
  }

  handleAuthentication() {
    this.auth0.parseHash({ _idTokenVerification: false}, (err, authResult) => {
      if(err) {
        var errorCode = err.code;
        var errorMessage = err.message;
        this.error(err).bind(this);
      }
      if(authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
          this.loggedInUser = user.email;
          this.emailVerified = user.email_verified;
          axios.get('/user?email=' + user.email)
            .then(function(response){
              localStorage.setItem('username', response.data.username);
            });
          localStorage.setItem('email', user.email);
          let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
          localStorage.setItem('expires_at', expiresAt);
        });
      }
    });
  }

  login(email, password) {
    this.auth0.client.login({
      grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
      realm: 'mprove',
      username: email,
      password
    }, (err, authResult) => {
      if (err) {
        var errorCode = err.code;
        var errorMessage = err.message;
        console.log(errorMessage);
        this.error(err).bind(this);
        return err;
      }
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      if(localStorage.getItem('access_token')){
        this.auth0.client.userInfo(localStorage.getItem('access_token'), (err, user) => {
          this.loggedInUser = user.email;
          this.emailVerified = user.email_verified;
          axios.get('/user?email=' + user.email)
            .then((response) => {
              localStorage.setItem('username', response.data.obj.username);
              localStorage.setItem('points', response.data.obj.points);
              localStorage.setItem('totalPoints', response.data.obj.totalPointsEarned);
              localStorage.setItem('targetsReached', response.data.obj.targetsReached);
              localStorage.setItem('rewardsClaimed', response.data.obj.rewardsClaimed);
              this.goHome(response.data.obj.username);
            })
          localStorage.setItem('email', user.email);
          this.emailVerified = user.email_verified;
          let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
          localStorage.setItem('expires_at', expiresAt);
        });
      }
    });
  }

  signup(email, password, user) {
    if(this.isAuthenticated){
      this.logout();
    };
    this.auth0.signup({
      connection: 'mprove',
      username: user.username,
      email,
      password
    }
    , err => {
      if (err) {
        var errorCode = err.code;
        var errorMessage = err.description;
        this.error(err).bind(this);
        return;
      };
      this.addUser(user);
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    localStorage.removeItem('expires_at');
    this.loggedInUser = "";
  }

  setUser(authResult){
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    if(localStorage.getItem('email') == undefined){
      return false;
    }
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  changePassword(email) {
    auth0.changePassword({
      connection: 'mprove',
      email: email
    }, function (err, resp) {
      if(err){
        console.log(err.message);
        this.error(err).bind(this);
        return;
      }else{
        console.log(resp);
      }
    });
  }

  addUser(user){
    const body = JSON.stringify(user);
    var config = {
      headers: {'Content-Type': 'application/json'}
    };
    axios.post('/user', body, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        this.error(err).bind(this);
      })
  }
}