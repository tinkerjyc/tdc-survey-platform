import React, { Profiler } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';

import { useEffect } from 'react';
import {Link} from "react-router-dom";

const ManageUsers = ({ getProfiles, profile: { profiles, loading } }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);
    return(
        <>
            <h3>Manage Users</h3>
            <ul className="list-group">
                {profiles.map(profile => (
                    <li className="list-group-item" key={profile.user._id}>
                        {profile.user.name}
                        <Link to={{
                            pathname: `/profile/${profile.user._id}`,
                            state: {profile}
                        }} className="float-right">
                            <button className="btn btn-primary">
                                Manage Accounts
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

ManageUsers.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getProfiles }
)(ManageUsers);