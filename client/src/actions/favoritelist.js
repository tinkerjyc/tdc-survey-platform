import api from '../utils/api';
import { setAlert } from './alert';
import movieService from '../components/services/movie-service'

import {
    GET_FAVORITELIST, FAVORITELIST_ERROR, REMOVE_FAVORITELIST, GET_FAVORITELIST_BY_ID, ADD_FAVORITELIST,GET_MOVIE_BY_MOVIE_ID
} from './types';

// Get favoritelist
export const getFavoritelist = () => async (dispatch) => {
    try {
        const res = await api.get('/favoritelist');

        dispatch({
            type: GET_FAVORITELIST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FAVORITELIST_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get favoritelist by id
export const getFavoritelistById = () => async (dispatch) => {
    try {
        const res = await api.get('/favoritelist/:favoritelistId');

        dispatch({
            type: GET_FAVORITELIST_BY_ID,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FAVORITELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Create favoritelist data
export const createFavoritelist = (formData) => async (
    dispatch
) => {
    try {
        console.log(formData)
        const res = await api.post('/favoritelist', formData);
        dispatch({
            type: ADD_FAVORITELIST,
            payload: res.data
        });

        dispatch(setAlert("Added to your favoritelist!",'success'));

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: FAVORITELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete favoritelist movie
export const deleteFavoritelist = (favoritelistId) => async (dispatch) => {
    try {
        const res = await api.delete(`/favoritelist/${favoritelistId}`);
        dispatch({
            type: REMOVE_FAVORITELIST,
            payload: favoritelistId
        });

        dispatch(setAlert('Movie Removed', 'success'));
    } catch (err) {
        dispatch({
            type: FAVORITELIST_ERROR,
            // payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Get movie by movie Id from movie service
export const getMovieNameById = (tmdbId) => async (dispatch) => {
    try {
        const res = await movieService.findMovieByTMDB(tmdbId);
        dispatch({
            type: GET_MOVIE_BY_MOVIE_ID,
            payload: {
                data:res,
                movieId: tmdbId
            }
        });
    } catch (err) {
        dispatch({
            type: FAVORITELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};