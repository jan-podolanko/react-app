'use client'

import { useEffect, useState } from 'react';
import './post.scss'
import { db } from '@/firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function Page({params: {id}}: {params: {id: string}}) {
    const [data, setData] = useState({});
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
        console.log(post);
        setData(post);
      };
    useEffect(() => {
      getPost();
    }, []);

    return (
        <div className="post-body">
             <div className="post-heading">
                <div className="post-title">
                    { data.title }
                </div>
                <div className="post-details">
                    Posted { data.date ? data.date.toString() : "on an unknown date"} by { data.author ? data.author : "an unknown user"}
                </div>
            </div>
            <div className="post-content"> { data.content } </div>
        </div>
    );
    }