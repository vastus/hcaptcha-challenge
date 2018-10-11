import auth0 from 'auth0-js';
import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from './common/Spinner';
import {setSession} from '../lib/auth';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errorMessage: null};
  }

  componentDidMount() {
    this.props.webAuth.parseHash((err, auth) => {
      if (err) {
        this.setState({errorMessage: err.message});
        return;
      }

      if (auth && auth.accessToken && auth.idToken) {
        setSession(auth);
        window.location.replace('/');
      }
    });
  }

  render() {
    if (this.state.errorMessage !== null) {
      return (
        <div>
          <h2>Something went wrong!</h2>

          <div>
            <pre>{errorMessage}</pre>
          </div>

          <p>Try <Link to="/login">logging in</Link> again.</p>
        </div>
      );
    }

    return <Spinner />;
  }
}

export default Auth;
