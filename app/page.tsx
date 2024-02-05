'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { db } from '@/firebase/firebase'
import Post from '@/components/post'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Link from 'next/link'


export default function Home() {
  const [data, setData] = useState([]);
  let posts: any = []
  const getPosts = async () => {
    let docs = await getDocs(collection(db, "posts"));
    docs.forEach((doc) => {
      posts.push({
        id: doc.id,
        title: doc.data().title,
        author: doc.data().userName,
        date: doc.data().date.toDate(),
        content: doc.data().content,
        email: doc.data().userEmail,
        userId: doc.data().userId,
        rating: doc.data().rating,
        upvotedBy: doc.data().upvotedBy,
        downvotedBy: doc.data().downvotedBy,
        homeView: true,
      });
    });
      /* posts.sort(sortByDateDesc); */
      setData(posts)
      console.log(posts[0].id)
    };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className={styles.main}>
      <div>
        Posts
      </div>
      <div className={styles.grid}>
      {data.map((post: any, index: any) => (
        <div key={index}><Post
          id={post.id}
          title={post.title}
          author={post.author}
          content={post.content}
          email={post.email}
          date={post.date} /></div>
        ))}
      </div>
    </main>
  )
}
