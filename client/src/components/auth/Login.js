import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import skylight from '../../materials/skyline-light.png';
import logo from '../../materials/logo.png';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role:'user'
  });

  const { email, password, role } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password, role);
  };

  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  return (
        <Fragment>
          <div className="auth-bg-login">
            <div className=" form-format">

              <h1 className="form-format-title">&nbsp;&nbsp;&nbsp;Login</h1>
              <div className="form-format-content">
                <form className="form" onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                        type="email"
                        placeholder="    Username or Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <input
                        type="password"
                        placeholder="    Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                        className="form-input"
                    />
                  </div>
                  {/*<select*/}
                  {/*  name="role"*/}
                  {/*  id="userFld"*/}
                  {/*  onChange={onChange}*/}
                  {/*  className="form-control"*/}
                  {/*>*/}
                  {/*  <option value="user">User</option>*/}
                  {/*  <option value="admin">Admin</option>*/}
                  {/*</select>*/}
                  <button type="submit" className="form-format-btn">Log In</button>
                  {/*<p className="my-1">*/}
                  {/*  Don't have an account? <Link to="/register">Register</Link>*/}
                  {/*</p>*/}
                </form>
              </div>
            </div>
            <img src={skylight} class="center"/>
          </div>
        </Fragment >
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
