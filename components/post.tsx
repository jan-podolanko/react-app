import { useState } from 'react';
import './post.scss'
import Link from 'next/link';

export default function Post({id, title, author, content, email, date}: 
    {
        id: String, 
        title: String,
        author: String,
        content: String,
        email: String,
        date: Date
    }) {
    const [showMore, setShowMore] = useState(false);
    function handleClick() {
        setShowMore(!showMore);
      }
    function ShowContent() {
        if(content.length > 30){
            return (
                <>
                <div className="clickable" onClick={handleClick}>
                 { showMore ? <div className="post-content"> { content } </div> : <div className="post-content"> { content.substring(0,29) + '...' } </div> } 
                 </div>
                </>
            )
        } else {
            return <div className="post-content"> { content } </div>
        }
    }
    return (
        <div className="post-body">
            <div className="post-heading">
                <Link href={`/${id}`}>
                    <div className="post-title">
                    { title }
                    </div>
                </Link>
                <div className="post-details">
                    Posted { date.toString() } by { author ? author : "an unknown author"}
                </div>
            </div>
            <ShowContent/>
        </div>
    );
}