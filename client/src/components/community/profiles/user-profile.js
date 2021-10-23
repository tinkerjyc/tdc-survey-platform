import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import { adminDeleteAccount, getCurrentProfile, getProfileById } from "../../../actions/profile";
import { connect } from "react-redux";

const UserProfile = ({
    auth: { isAuthenticated, user },
    profileById,
    getProfileById,
    adminDeleteAccount
}) => {
    const { profileId } = useParams();
    useEffect(() => {
        getProfileById(profileId)
    }, [profileId])
    return (
        (profileById != null) &&
        <div>
            <div className='profile'>
                <img src={profileById.user.avatar} alt='' className='profile-img round-img' />
                {
                    isAuthenticated && user && user.role === "user" &&
                    <div>
                        <h2>This is {profileById.user.name} 's profile:</h2>
                        <p className='my-1'>My bio: {profileById.bio}</p>
                        <p>Favorite movie genre:</p>
                        <ul>
                            {profileById.movieTag.slice(0, 4).map((tag, index) => (
                                <li key={index} className='text-primary'>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                {
                    !isAuthenticated && !user &&
                    <Link to="/login">
                        Please Login to see the profile!
                    </Link>
                }
                {
                    isAuthenticated && user && user.role === "admin" &&
                    <Link to="/">
                        <button className="btn btn-danger" onClick={() => adminDeleteAccount(profileId)}>
                            admin delete
                        </button>
                    </Link>
                }
            </div>
        </div>
    )
}

UserProfile.propTypes = {
    adminDeleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profileById: state.profile.profileById
});

export default connect(
    mapStateToProps,
    { adminDeleteAccount, getProfileById }
)(UserProfile);