import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import {deleteFavoritelist, getFavoritelist} from '../../actions/favoritelist'
import FavoritelistItem from "./favoritelist-item";

const FavoriteList = (
    {
        getFavoritelist,
        getCurrentProfile,
        auth: { isAuthenticated, user }, profile,
        favoritelist: { movies, loading , movieId, movieById}
    }) => {
    useEffect(() => {
        getCurrentProfile();
        getFavoritelist();
    }, []);
    return (
        <div>
            <h1>Favorite List Page</h1>
            {
                console.log(movies)
            }
            {
                !loading && isAuthenticated &&
                <ul className="list-group">
                    {
                        movies.filter((movie) =>
                            movie.user === user._id
                        ).map((movie) => <FavoritelistItem movie={movie}/>)
                    }
                </ul>
            }

        </div>
    )
}

FavoriteList.propTypes = {
    getFavoritelist: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    favoritelist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    favoritelist: state.favoritelist
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, getFavoritelist}
)(FavoriteList);
