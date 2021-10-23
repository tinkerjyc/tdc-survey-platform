     import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Navbar = ({ auth: { isAuthenticated, user }, logout, getCurrentProfile}) => {
  useEffect(() => {
    { isAuthenticated && getCurrentProfile(); }
  }, [getCurrentProfile]);

  const authLinks = (
    <div className="row justify-content-center align-items-center">
      <Link className="nav-link" to="/profile">
        {
          isAuthenticated && user &&
            <span className="hide-sm">{user.name}</span>
        }
        {
          !isAuthenticated &&
          <span className="hide-sm">Register</span>
        }
      </Link>
      <Link to="/">
        <a className="nav-link" onClick={logout} href="#!">
          <span>&nbsp;&nbsp;</span>
          <span className="hide-sm">LOGOUT</span>
        </a>
      </Link>
    </div>
  );

  const guestLinks = (
    <div className="row justify-content-center align-items-center">
      <Link className="nav-link" to="/register">REGISTER</Link>
      <span>&nbsp;&nbsp;</span>
      <Link className="nav-link" to="/login">LOGIN</Link>
    </div>
  );

  return (
    <nav className="fixed-nav-bar">
      <header>
        {/* <h1>Movie Page Information</h1> */}

        <section id="d-flex flex-row">
          <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
            <Link className="navbar-brand" to="/">
              <div className="row justify-content-center align-items-center">
                <h2 className="ml-2">Home</h2>
              </div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li>
                  <Link className="nav-link" to="/search/">Search</Link>
                </li>
                <li>
                  <Link className="nav-link" to="/profiles">Community</Link>
                </li>
                {
                  isAuthenticated &&
                  <li>
                    <Link className="nav-link" to="/watchlist">Watch List</Link>
                  </li>
                }
                {
                  isAuthenticated &&
                  <li>
                  <Link className="nav-link" to="/favoritelist">Favorite List</Link>
                  </li>
                }
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
              </ul>
            </div>
          </nav>
        </section>
        <div className="alert alert-primary" role="alert">
          <span
            className="closebtn"
            onClick={(e) => { e.target.parentElement.style.display = 'none'; }}
          >&times;</span>

          <p>Welcome to Movie Manager website </p>
        </div>
      </header>
    </nav >
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(Navbar);
