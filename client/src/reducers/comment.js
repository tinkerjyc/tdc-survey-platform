import {
    GET_COMMENTS, 
    COMMENT_ERROR, 
    GET_COMMENTS_BY_MOVIE, 
    GET_COMMENTS_BY_USER,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions/types';

const initialState = {
    user: null,
    comment: null,
    comments: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: payload,
                loading: false
            };
        case GET_COMMENTS_BY_MOVIE:
            return {
                ...state,
                comments: payload,
                loading: false
            };
        case GET_COMMENTS_BY_USER:
            return {
                ...state,
                comments: payload,
                loading: false
            };
        case ADD_COMMENT:
            const temp = [...state.comments];
            temp.unshift(payload);
            return {
                ...state,
                comments: temp,
                loading: false
            };
        case REMOVE_COMMENT:
            const temp2 = [...state.comments];
            return {
                ...state,
                comments: temp2.filter((comment) => {
                    console.log(comment._id);
                    console.log(payload.toString());
                    if(comment._id === payload) return false;
                    else return true;
                }),
                loading: false
            };
        // case UPDATE_PROFILE:
        //     return {
        //         ...state,
        //         profile: payload,
        //         loading: false
        //     };
        case COMMENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                comment: null
            };
        default:
            return state;
    }
}