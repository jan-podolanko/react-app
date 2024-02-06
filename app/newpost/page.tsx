'use client'

import { db } from '@/firebase/firebase'
import './styles.scss'
import { Timestamp, addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function CreatePost() {
  const [title, setTitle] = useState("Title");
  const [nickName, setNickName] = useState("Nickname");
  const [content, setContent] = useState("Post content");
  const [warning, setWarning] = useState(false);
  function addPost(){
    if(title == "Title" || nickName == "Nickname" || content == "Post content" || title == "" || nickName == "" || content == ""){
      setWarning(true);
    } else {
    addDoc(collection(db, "posts"), {
      title: title,
      userName: nickName,
      userEmail: "unknown email",
      userId: "unknown user id",
      content: content,
      date: Timestamp.now(),
      rating: 1,
      upvotedBy: [],
      downvotedBy: [],
  })}};
  function Warning(){
    if(warning){
      return <div>An error occured, try again!</div>
    }
  }
  return (
    <>
    <main>
      <div className="form-body">
        <div className='form-title'>Create Post</div>
        <div className='form-input-container'>
          <input
            className='form-input'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <input
            className='form-input'
            value={nickName}
            onChange={(e) => setNickName(e.target.value)} />
          <input
            className='form-input'
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        </div>
        <button className="form-submit" onClick={addPost}>Submit</button>
        <Warning /></div>
      </main></>
  )
}
