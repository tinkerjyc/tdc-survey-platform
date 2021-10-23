import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import SearchScreenLogin from "../content/search-screen-login";
import ProfileInfo from "./profile-info";
import ManageUsers from "./manage-users";

const Profile = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <>
      {
        user &&
        <div className="home-title">
      
          <ProfileInfo user={user}/>
        
        </div>
      } 
        {
            user && user.role === "user" &&
            <div className="container bg-color-light">
                {profile !== null ? (
                    <>
                        <p className="">
                            How you feel about movie?
                        </p>
                        <p className="">Want to share your thoughts about movie search with others?</p>
                        <div className="my-2">
                            <Link to="/edit-profile" className="btn btn-dark">
                                Edit thoughts
                            </Link>
                            <button className="btn btn-light" onClick={() => deleteAccount()}>
                                Delete Account
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="">Want to share your thoughts about movie search with others?</p>
                        <div className="my-2">
                            <Link to="/create-profile" className="btn btn-primary my-1">
                                Create thoughts
                            </Link>
                            <button className="btn btn-light" onClick={() => deleteAccount()}>
                                Delete Account
                            </button>
                        </div>
                    </>
                )
                }
            </div>
        }
        {
          user && user.role === "admin" &&
              <ManageUsers/>
        }
      <SearchScreenLogin/>
    </ >
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Profile
);
