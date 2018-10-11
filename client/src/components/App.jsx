import auth0 from 'auth0-js';
import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Auth from './Auth';
import Header from './Header';
import Home from './Home';

import Login from './Login';
import Secret from './Secret';
import {clearSession, isAuthenticated} from '../lib/auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {loggedIn: isAuthenticated()};
  }

  render() {
    const webAuth = new auth0.WebAuth({
      domain: 'vastus.eu.auth0.com',
      clientID: 'ovU4bV9uHGqic9yigNh6dtbqphq3Dq2l',
      responseType: 'token id_token',
      redirectUri: window.location.origin + '/auth/callback',
    });

    const {loggedIn} = this.state;

    return (
      <div>
        <Router>
          <div>
            <Header loggedIn={loggedIn} logout={this.logout} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={() => <Login loggedIn={loggedIn} webAuth={webAuth} />} />
            <Route exact path="/auth/callback" render={() => <Auth webAuth={webAuth} />} />
            <Route exact path="/secret" render={() => <Secret loggedIn={loggedIn} />} />
          </div>
        </Router>
      </div>
    );
  }

  logout(e) {
    e.preventDefault();
    clearSession();
    this.setState({loggedIn: false});
  }
}

export default App;
