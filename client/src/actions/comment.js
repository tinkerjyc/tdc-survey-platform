
import reducers from '../reducers';
import api from '../utils/api';
import { setAlert } from './alert';

import {
    GET_COMMENTS,
    COMMENT_ERROR,
    GET_COMMENTS_BY_MOVIE,
    GET_COMMENTS_BY_USER,
    REMOVE_COMMENT,
    ADD_COMMENT
} from './types';

// Get current movie's comments
export const getComments = () => async (dispatch) => {
    try {
        const res = await api.get('/comments');

        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getCommentsByMovie = (movieId) => async (dispatch) => {
    try {
        const res = await api.get(`/comments/movie/${movieId}`);

        dispatch({
            type: GET_COMMENTS_BY_MOVIE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getCommentsByUser = (userId) => async (dispatch) => {
    try {
        const res = await api.get(`/comments/user/${userId}`);

        dispatch({
            type: GET_COMMENTS_BY_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const deleteComment = (commentId) => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            const res = await api.delete(`/comments/${commentId}`);
            dispatch({
                type: REMOVE_COMMENT,
                payload: res.data
            });

            dispatch(setAlert('Your comment has been permanently deleted'));
        } catch (err) {
            dispatch({
                type: COMMENT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
}

export const postComment = (commentData) => async (dispatch) => {
    try {
        const res = await api.post('/comments', commentData);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        // dispatch(setAlert('Comment posted', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}