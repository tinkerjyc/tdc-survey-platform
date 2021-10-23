import {
    GET_FAVORITELIST, GET_FAVORITELIST_BY_ID, FAVORITELIST_ERROR, REMOVE_FAVORITELIST, ADD_FAVORITELIST, GET_MOVIE_BY_MOVIE_ID
} from '../actions/types';

const initialState = {
    movie: null,
    movies: [],
    movieId: "",
    movieById: "",
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_FAVORITELIST:
            return {
                ...state,
                movies: payload,
                loading: false
            };
        case GET_FAVORITELIST_BY_ID:
            return {
                ...state,
                movie: payload,
                loading: false
            };
        case ADD_FAVORITELIST:
            const temp = [...state.movies];
            temp.push(payload)
            return {
                ...state,
                movies: temp,
                loading: false
            }
        case GET_MOVIE_BY_MOVIE_ID:
            return {
                ...state,
                movieById: payload.data,
                movieId: payload.movieId,
                loading: false
            }
        case REMOVE_FAVORITELIST:
            const temp2 = [...state.movies];
            console.log(temp2);
            console.log(payload);
            return {
                ...state,
                movies: temp2.filter((watchlist) => {
                    if(watchlist._id == payload) return false;
                    else return true;
                }),
                loading: false
            }
        case FAVORITELIST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}