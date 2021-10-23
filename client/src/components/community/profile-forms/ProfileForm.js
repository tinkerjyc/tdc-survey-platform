import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../actions/profile";

const initialState = {
  movieTag: "",
  bio: "",
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      if (Array.isArray(profileData.movieTag))
        profileData.movieTag = profileData.movieTag.join(", ");
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const { movieTag, bio } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <div className="home-title">
        <h1 className="large text-primary">Your comments about Movie Search</h1>
        <p className="lead text-light">Tell us how you feel about Movie Search</p>
      </div>
      <form className="form form-profile" onSubmit={onSubmit}>
        <div className="form-group">
          <p className="form-text">
            Your favorite movies:
            (Please use comma to separate movies)
          </p>
          <input
            type="text"
            placeholder="Describe Movie"
            name="movieTag"
            value={movieTag}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <p className="form-text">Something you want to share about yourself</p>
          <textarea
            placeholder="Something you want to share"
            name="bio"
            value={bio}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/profile">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
