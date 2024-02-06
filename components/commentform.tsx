'use client'

import { db } from '@/firebase/firebase'
import './styles.scss'
import { Timestamp, addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function AddComment({id}: {id: string}) {
  const [nickName, setNickName] = useState("Nickname");
  const [content, setContent] = useState("Comment content");
  const [warning, setWarning] = useState(false);
  function addComm(){
    if(nickName == "Nickname" || content == "Comment content" || nickName == "" || content == ""){
      setWarning(true);
    } else {
    addDoc(collection(db, "comments"), {
      postId: id,
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
    <><div className="form-body">
      <div className='form-title'>Add Comment</div>
      <div className='form-input-container'>
        <input
          className='form-input'
          value={nickName}
          onChange={(e) => setNickName(e.target.value)} />
        <input
          className='form-input'
          value={content}
          onChange={(e) => setContent(e.target.value)} />
      </div>
      <button className="form-submit" onClick={addComm}>Submit</button>
      <Warning /></div></>
  )
}
