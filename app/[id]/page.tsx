'use client'

import { useEffect, useState } from 'react';
import './post.scss'
import { db } from '@/firebase/firebase';
import { getDoc, doc, collection, getDocs, where, query } from 'firebase/firestore';
import { Inter } from 'next/font/google'
import '../globals.css'
import Comment from '@/components/comment';

const inter = Inter({ subsets: ['latin'] })

export default function Page({params: {id}}: {params: {id: string}}) {
    const [data, setData] = useState({});
    const [comms, setComms] = useState([]);
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
    useEffect(() => {
      getPost();
      getComments();
    }, []);

    return (
        <><div className="subpost-body">
            <div className="subpost-heading">
                <div className="subpost-title">
                    {data.title}
                </div>
                <div className="subpost-details">
                    Posted {data.date ? data.date.toString() : "on an unknown date"} by {data.author ? data.author : "an unknown user"}
                </div>
            </div>
            <div className="subpost-content"> {data.content} </div>
        </div>
        <div id='comments-header'>Comments</div>
        <div>
                {comms.map((com: any, index: any) => (
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
            </div></>
    );
    }