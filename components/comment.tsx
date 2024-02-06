import { useState } from 'react';
import './post.scss'
import Link from 'next/link';

export default function Comment({postId, commentId, userId, userEmail, userName, date, content, rating, upvotedBy, downvotedBy}: 
    {
        postId: String,
        commentId: String,
        userId: String,
        userEmail: String,
        userName: String,
        date: Date,
        content: String,
        rating: Number,
        upvotedBy: String[],
        downvotedBy: String[],
    }) {
    return (
        <div className="comment-body">
            <div className="comment-heading">
                <div className="comment-details">
                    Posted { date.toString() } by <div style={{display: "inline", fontWeight: "400"}}>{ userName ? userName : "an unknown user"}</div>
                </div>
            </div>
            <div className="comment-content"> { content } </div>
        </div>
    );
}