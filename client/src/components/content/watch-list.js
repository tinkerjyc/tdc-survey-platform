import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import {deleteWatchlist, getWatchlist} from '../../actions/watchlist'
import WatchlistItem from './watchlist-item'

const WatchList = (
    {
        getWatchlist,
        getCurrentProfile,
        auth: { isAuthenticated, user }, profile,
        watchlist: { movies, loading , movieId, movieById}
    }) => {
    useEffect(() => {
        getCurrentProfile();
        getWatchlist();
    }, []);
    return (
        <div>
            <h1>Watch List Page</h1>
            {
                console.log(movies)
            }
            {
                !loading && isAuthenticated &&
                    <ul className="list-group">
                        {
                            movies.filter((movie) =>
                                movie.user === user._id
                            ).map((movie) => <WatchlistItem movie={movie}/>)
                        }
                    </ul>
            }

        </div>
    )
}

WatchList.propTypes = {
    getWatchlist: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    watchlist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    watchlist: state.watchlist
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, getWatchlist}
)(WatchList);
