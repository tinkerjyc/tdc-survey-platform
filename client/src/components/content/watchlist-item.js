import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteWatchlist, getMovieNameById } from '../../actions/watchlist'
import { Link } from "react-router-dom";

const WatchlistItem = ({
    movie,
    deleteWatchlist,
    getMovieNameById,
    watchlist: { movieId, movieById },
}) => {
    const [movieTitle, setMovieTitle] = useState("");
    useEffect(() => {
        if (movieId === movie.movie) {
            setMovieTitle(movieById.title)
        }
    }, [movie,movieId])
    useEffect(() => {
        getMovieNameById(movie.movie)
    }, [movie])

    return (
    < li className="list-group-item" >
        <Link to={`/details/${movie.movie}`}>
            {movieTitle}
        </Link>
        <button
            onClick={() => {
                deleteWatchlist(movie._id)
            }}
            className="btn btn-danger float-right">
            Remove
        </button>
    </li >)
}

WatchlistItem.propTypes = {
    deleteWatchlist: PropTypes.func.isRequired,
    getMovieNameById: PropTypes.func.isRequired,
    watchlist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    watchlist: state.watchlist
});

export default connect(
    mapStateToProps,
    { deleteWatchlist, getMovieNameById }
)(WatchlistItem);



