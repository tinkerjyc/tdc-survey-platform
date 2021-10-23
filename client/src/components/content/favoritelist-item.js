import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteFavoritelist, getMovieNameById } from '../../actions/favoritelist'
import { Link } from "react-router-dom";

const FavoritelistItem = ({
                              movie,
                              deleteFavoritelist,
                           getMovieNameById,
                           favoritelist: { movieId, movieById },
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
                    deleteFavoritelist(movie._id)
                }}
                className="btn btn-danger float-right">
                Remove
            </button>
        </li >)
}

FavoritelistItem.propTypes = {
    deleteFavoritelist: PropTypes.func.isRequired,
    getMovieNameById: PropTypes.func.isRequired,
    favoritelist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    favoritelist: state.favoritelist
});

export default connect(
    mapStateToProps,
    { deleteFavoritelist, getMovieNameById }
)(FavoritelistItem);



