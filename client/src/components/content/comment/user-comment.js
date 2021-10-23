import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import { getProfiles, getCurrentProfile } from '../../../actions/profile';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { getCommentsByUser } from "../../../actions/comment";
import CommentList from "./comment-list";
import CommentInput from "./comment-input"

const UserComment = ({
    userId,
    getCommentsByUser,
    getCurrentProfile,
    comments
}) => {
    useEffect(() => {
        getCurrentProfile();
        getCommentsByUser(userId);
    }, [])
    return (
        <>
            <h1>User Comment</h1>
            <CommentList comments={comments} />
        </>
    );
};

UserComment.propTypes = {
    getCommentsByUser: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    comments: state.comment.comments
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, getCommentsByUser }
)(UserComment);
