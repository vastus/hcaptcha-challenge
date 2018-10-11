import React from 'react';
import {Redirect} from 'react-router-dom';
import HCaptcha from 'react-hcaptcha';
import Spinner from './common/Spinner';
import * as api from '../lib/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.verify = this.verify.bind(this);
    this.state = {loading: false, verified: false};
  }

  render() {
    const {loggedIn, webAuth} = this.props;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <div>
        <h2>Login</h2>

        {this.state.verified ? (
          <div>
            <h3>Verified!</h3>
            <p>Go ahead and login now using one of the OAuth providers below.</p>

            <div className="login-buttons">
              <button className="login-btn" disabled={!this.state.verified} onClick={(e) => webAuth.authorize({connection: 'github'})}>
                GitHub
              </button>

              <button className="login-btn" disabled={!this.state.verified} onClick={(e) => webAuth.authorize({connection: 'google-oauth2'})}>
                Google
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>To be able to log in you need to prove that you're a human before proceeding.</p>

            <h3>Prove you're human</h3>

            <HCaptcha
              sitekey="e1715201-770b-4f61-87da-523133844aec"
              onVerify={this.verify}
            />
          </div>
        )}
      </div>
    );
  }

  verify(token) {
    this.setState({loading: true});
    api
      .POST('/verify', {token})
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('response failed');
      })
      .then((json) => this.setState({loading: false, verified: true}))
      .catch(err => alert('Something went wrong, try again.'));
  }
}

export default Login;
