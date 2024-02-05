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
  const [sortState, setSortState] = useState("dateDesc");
  const [searchState, setSearchState] = useState("");
  let posts: any = [];
  const getPosts = async () => {
    let docs = await getDocs(collection(db, "posts"));
    posts = [];
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
      setData(posts)
    };
    const sortMethods = {
      dateDesc: { method: (a: {date: number}, b: {date: number}) => {return (b.date - a.date)}},
      dateAsc: { method: (a: { date: number }, b: { date: number }) => { return (a.date - b.date) }},
      alphaDesc: {method: (a: { title: any }, b: { title: any }) => b.title.toLowerCase().localeCompare(a.title.toLowerCase())},
      alphaAsc: {method: (a: { title: any }, b: { title: any }) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())}
    }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.navhead}>
        All Posts
        <button className={styles.navbutton}>Create post</button>
        <button onClick={(e)=>setSortState("dateDesc")}>sort date desc</button>
        <button onClick={(e)=>setSortState("dateAsc")}>sort date asc</button>
        <button onClick={(e)=>setSortState("alphaDesc")}>sort alpha desc</button>
        <button onClick={(e)=>setSortState("alphaAsc")}>sort alpha asc</button>
        <input 
        value={searchState} 
        onChange={(e) => setSearchState(e.target.value)}/>
      </div>
      <div className={styles.grid}>
      {data.sort(sortMethods[sortState].method).filter((post: { content: string }) => post.content.toLowerCase().includes(searchState)).map((post: any, index: any) => (
        <h1 key={index}><Post
          id={post.id}
          title={post.title}
          author={post.author}
          content={post.content}
          email={post.email}
          date={post.date} /></h1>
        ))}
      </div>
    </main>
  )
}
