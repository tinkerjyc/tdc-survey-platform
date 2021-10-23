import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getProfiles, getCurrentProfile } from '../../../actions/profile';
import {Link} from "react-router-dom";
import { withRouter } from "react-router";

const Profiles = ({
                    getProfiles,
                    getCurrentProfile,
                    auth: { isAuthenticated, user },
                    profile: { profiles, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    getProfiles();
  }, [getProfiles, getCurrentProfile]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
          <>
            <div className="home-title">
              <h1 className='large text-primary'>Community</h1>
              <p className='lead text-center text-light'>
                See how people think about Movie Manager here
              </p>
            </div>
            <div className='profiles'>
              <ul className="list-group">
                {profiles.length > 0 ? (
                  profiles.map(p => (
                      <li className="list-group-item">
                        {
                          isAuthenticated &&
                          user._id === p.user._id &&
                          <Link to="/profile">
                            {p.user.name}
                          </Link>
                        }
                        {
                             !isAuthenticated &&
                             <Link to={`/profile/${p.user._id}`}>
                                   {p.user.name}
                             </Link>
                        }
                          {
                              isAuthenticated &&
                              user._id !== p.user._id &&
                              <Link to={`/profile/${p.user._id}`}>
                                  {p.user.name}
                              </Link>
                          }
                      </li>
                  ))
                ) : (
                    <h4>No profiles found...</h4>
                  )}
              </ul>
            </div>
          </>
        )}
    </>
  );
};

Profiles.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, getCurrentProfile }
)(withRouter(Profiles));
