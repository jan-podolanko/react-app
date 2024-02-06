'use client'

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
    const sortMethods: any = {
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
        <p style={{display: 'inline'}} className={styles.sortbutton}>sort by:</p>
        <button className={styles.sortbutton} onClick={(e)=>setSortState("dateDesc")}>date, desc</button>
        <button className={styles.sortbutton} onClick={(e)=>setSortState("dateAsc")}>date, asc</button>
        <button className={styles.sortbutton} onClick={(e)=>setSortState("alphaDesc")}>z to a</button>
        <button className={styles.sortbutton} onClick={(e)=>setSortState("alphaAsc")}>a to z</button>
        <input 
        className={styles.sortbutton}
        value={searchState} 
        onChange={(e) => setSearchState(e.target.value)}/>
        <Link href="/newpost" className={styles.sortbutton}>create post</Link>
      </div>
      <div className={styles.grid}>
      {data.sort(sortMethods[sortState].method).filter((post: { content: string }) => post.content.toLowerCase().includes(searchState)).map((post: any, index: any) => (
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
