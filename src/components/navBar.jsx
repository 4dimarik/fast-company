import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = (props) => {
  return (
    <nav className="nav">
      <Link className="nav-link" to="/">
        Main
      </Link>
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/users">
        Users
      </Link>
    </nav>
  );
};

NavBar.propTypes = {};

export default NavBar;
