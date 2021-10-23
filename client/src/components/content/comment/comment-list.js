import React from 'react'
import CommentItem from "./comment-item";

const CommentList = ({
    comments
}) =>
    <ul className="list-group">
        {
            comments.map((comment) =>
                <CommentItem comment={comment} />
            )
        }
    </ul>

export default CommentList