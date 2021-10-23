import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import movieIcon from '../../../asset/movie-icon.png';
import {connect} from "react-redux";
import {adminDeleteAccount, getCurrentProfile} from "../../../actions/profile";
import { createWatchlist, deleteWatchlist, getWatchlist } from "../../../actions/watchlist";
import { createFavoritelist } from "../../../actions/favoritelist";
import Alert from "../../layout/Alert";

const MovieCard = (
    {
        movie,
        createWatchlist,
        createFavoritelist,
        auth: { isAuthenticated, user }
    }) => {
    const [iconSrc, setIconSrc] = useState(`https://image.tmdb.org/t/p/original/${movie.poster_path}`)
    // const [formData, setFormData] = useState({
    //     user: user == null? "" : user._id,
    //     movie: movie.id
    // })
    function refreshPage() {
        window.location.reload(false);
    }
    return(
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div className="card" style={{margin: "0px", padding:'0px'}}>
                <img src={iconSrc}
                    onError={() => {setIconSrc(movieIcon)}}></img>
                <div className="card-body">
                    <Link to={`/details/${movie.id}`}>
                        {movie.title}
                    </Link>
                    { isAuthenticated &&
                        <div>
                            <div className="mt-3">
                                <button
                                    onClick={() => {
                                        createWatchlist({user: user._id, movie: movie.id})
                                        // refreshPage()
                                        // alert("Added to watchlist!")
                                    }}
                                    className="btn btn-primary">
                                    Add to WatchList
                                </button>
                            </div>
                            <div className="mt-1">
                                <button
                                    onClick={() => {
                                        createFavoritelist({user: user._id, movie: movie.id})
                                        // refreshPage()
                                        // alert("Added to watchlist!")
                                    }}
                                    className="btn btn-warning"
                                    style={{width: '100%'}}
                                >Add to FavoriteList
                                </button>
                            </div>
                        </div>
                    }
                    { !isAuthenticated &&
                    <div>
                        <div className="mt-3">
                            <Link to="/login">
                                <button className="btn btn-primary" style={{width: '100%'}}>Add to WatchList</button>
                            </Link>
                        </div>
                        <div className="mt-1">
                            <Link to="/login">
                                <button className="btn btn-warning" style={{width: '100%'}}>Add to FavoriteList</button>
                            </Link>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

MovieCard.propTypes = {
    auth: PropTypes.object.isRequired,
    createWatchlist: PropTypes.func.isRequired,
    createFavoritelist: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps, { createWatchlist, createFavoritelist }
)(MovieCard);