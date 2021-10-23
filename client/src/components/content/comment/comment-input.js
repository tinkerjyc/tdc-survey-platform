import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment } from '../../../actions/comment'

const CommentInput = (
    {
        movieId,
        postComment,
        auth: { isAuthenticated, user }
    }) => {
    const [text, setText] = useState("");
    return (
        <div className="row">
            <textarea
                onChange={(e) =>setText(e.target.value)}
                value={text} 
                name="text"
                className="form-control"
                placeholder="Comment here..."
                disabled={!isAuthenticated}></textarea>
            {
                isAuthenticated &&
                <button 
                    className="btn btn-primary form-control"
                    onClick={() => {
                    postComment({movieId: movieId, text: text}).then(setText(""))
                }}
                    className="btn btn-primary">
                    Submit Comment
                </button>
            }
            {
                !isAuthenticated &&
                <Link to="/login"
                    className="btn btn-primary form-control">
                    Login
                </Link>
            }

        </div>
    )
}

CommentInput.propTypes = {
    postComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { postComment }
)(CommentInput)