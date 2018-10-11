import React from 'react';
import {Link} from 'react-router-dom';
import {clearSession} from '../lib/auth';

const Header = (props) => {
  return (
    <header>
      <h1>hCaptcha</h1>

      <nav>
        <ul>
          <li><Link className="nav-link" to="/">Home</Link></li>
          {props.loggedIn ? (
            <React.Fragment>
              <li><Link className="nav-link" to="/secret">Secret</Link></li>
              <li><a className="nav-link" href="/#logout" onClick={props.logout}>Logout</a></li>
            </React.Fragment>
          ) : (
            <li><Link className="nav-link" to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
