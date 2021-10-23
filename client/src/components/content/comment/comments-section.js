import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getProfiles, getCurrentProfile } from '../../../actions/profile';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { getCommentsByMovie } from "../../../actions/comment";
import CommentList from "./comment-list";
import CommentInput from "./comment-input"

const CommentSection = ({
    movieId,
    getCommentsByMovie,
    getCurrentProfile,
    comment: { comments, loading }
}) => {
    useEffect(() => {
        getCurrentProfile();
        getCommentsByMovie(movieId);
    }, [])

    return (
        <>
            <h1>comment section</h1>
            <CommentInput movieId={movieId} />
            <CommentList comments={comments} />
        </>
    );
};

CommentSection.propTypes = {
    getCommentsByMovie: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    comment: state.comment
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, getCommentsByMovie }
)(CommentSection);
