import React from 'react';
import {Link} from 'react-router-dom';
import Result from 'folktale/result';
import Spinner from './common/Spinner';
import {GET} from '../lib/api';
import {getToken} from '../lib/auth';

class Secret extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, response: null};
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      return;
    }

    GET('/howdy', {headers: {authorization: 'Bearer ' + getToken()}})
      .then((resp) => {
        if (resp.ok) {
          return resp.text();
        }
        throw new Error(`failed to fetch: ${resp.status} - ${resp.statusText}`);
      })
      .then((text) => this.setState({loading: false, response: Result.of(text)}))
      .catch((err) => this.setState({loading: false, response: Result.Error(err.message)}))
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <div>
          <h3>Access denied!</h3>
          <p>You need to <Link to="/login">log in</Link> before getting access to this page.</p>
        </div>
      );
    }

    if (this.state.loading || !this.state.response) {
      return <Spinner />;
    }

    return (
      <div>
        <h2>Secret</h2>

        {this.state.response.matchWith({
          Error: ({value: errorMessage}) => (
            <div>
              <h3>Error :/</h3>
              <p>The API call failed with: <code>{errorMessage}</code></p>
            </div>
          ),
          Ok: ({value: text}) => (
            <div>
              <p>The response received from the API</p>

              <div>
                <pre>{text}</pre>
              </div>
            </div>
          ),
        })}
      </div>
    );
  }
};

export default Secret;
