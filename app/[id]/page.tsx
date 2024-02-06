'use client'

import { useEffect, useState } from 'react';
import './post.scss'
import { db } from '@/firebase/firebase';
import { getDoc, doc, collection, getDocs, where, query } from 'firebase/firestore';
import '../globals.css'
import Comment from '@/components/comment';
import AddComment from '@/components/commentform';

export default function Page({params: {id}}: {params: {id: string}}) {
    const [data, setData] = useState({title: "title", date: "date", content: "content", author: "author"});
    const [comms, setComms] = useState([]);
    const [sortState, setSortState] = useState("dateDesc");
    const [showCommentForm, setShowCommentForm] = useState(false);

    let post: any = {
            id: "",
            title: "Example post",
            author: "unknown user",
            date: "on an unknown date",
            content: "example content",
            email: "",
            userId: "",
            rating: "",
            upvotedBy: "",
            downvotedBy: "",
            homeView: true,
    }
    let comments: any = []
    const getPost = async () => {
        let document = await getDoc(doc(db, "posts", id));
        post = {
            id: document.id,
            title: document?.data()?.title,
            author: document?.data()?.userName,
            date: document?.data()?.date.toDate(),
            content: document?.data()?.content,
            email: document?.data()?.userEmail,
            userId: document?.data()?.userId,
            rating: document?.data()?.rating,
            upvotedBy: document?.data()?.upvotedBy,
            downvotedBy: document?.data()?.downvotedBy,
            homeView: true,
        };
        setData(post);
      };
    const getComments = async () => {
        const docRef = collection(db, "comments");
        let commentDocs = await getDocs(query(docRef, where("postId", "==", id)));
        comments = [];
        commentDocs.forEach((doc) => {
            comments.push({
            postId: id,
            commentId: doc.id,
            userId: doc.data().userId,
            userEmail: doc.data().userEmail,
            userName: doc.data().userName,
            date: doc.data().date.toDate(),
            content: doc.data().content,
            rating: doc.data().rating,
            upvotedBy: doc.data().upvotedBy,
            downvotedBy: doc.data().downvotedBy,
            });
        });
        setComms(comments);
    };
    const sortMethods: any = {
        dateDesc: { method: (a: {date: number}, b: {date: number}) => {return (b.date - a.date)}},
        dateAsc: { method: (a: { date: number }, b: { date: number }) => { return (a.date - b.date) }},
        alphaDesc: {method: (a: { content: string }, b: { content: string }) => b.content.toLowerCase().localeCompare(a.content.toLowerCase())},
        alphaAsc: {method: (a: { content: string }, b: { content: string }) => a.content.toLowerCase().localeCompare(b.content.toLowerCase())}
    };
    useEffect(() => {
      getPost();
      getComments();
    }, []);
    function CommentForm(){
        if(showCommentForm){
            return <AddComment id={id} />
        }
    }
    return (
        <>
        <div className='subpost-container'>
            <div className="subpost-body">
                <div className="subpost-heading">
                    <div className="subpost-title">
                        {data.title}
                    </div>
                    <div className="subpost-details">
                        Posted {data.date ? data.date.toString() : "on an unknown date"} by <div style={{display: "inline", fontWeight: "400"}}>{data.author ? data.author : "an unknown user"}</div>
                    </div>
                </div>
                <div className="subpost-content"> {data.content} </div>
            </div>
            <div id='comments-header'>Comments</div>
            <div className='button-container'>
                <div className="sort-button" style={{display: "inline"}}>sort by:</div>
                <button className="sort-button" onClick={(e)=>setSortState("dateDesc")}>date, desc</button>
                <button className="sort-button" onClick={(e)=>setSortState("dateAsc")}>date, asc</button>
                <button className="sort-button" onClick={(e)=>setSortState("alphaDesc")}>z to a</button>
                <button className="sort-button" onClick={(e)=>setSortState("alphaAsc")}>a to z</button>
                <button className="sort-button" onClick={(e)=>setShowCommentForm(!showCommentForm)}>add comment</button>
            </div>
            <CommentForm />
            <div>
                {comms.sort(sortMethods[sortState].method).map((com: any, index: any) => (
                    <div key={index}>
                        <Comment
                        postId={com.postId}
                        commentId={com.commentId}
                        userId={com.userId}
                        userEmail={com.userEmail}
                        userName={com.userName}
                        date={com.date}
                        content={com.content}
                        rating={com.rating}
                        upvotedBy={com.upvotedBy}
                        downvotedBy={com.downvotedBy} />
                    </div>
                ))}
            </div>
        </div></>
    )};