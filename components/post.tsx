import './post.scss'

export default function Post({id, title, author, content, email, date}: 
    {
        id: String, 
        title: String,
        author: String,
        content: String,
        email: String,
        date: Date
    }) {
    function ShowContent() {
        let show = false;
        if(content.length > 30){
            if(show){
                return (
                    <>
{/*                     <button onClick={()=> show = !show}>click me!</button>
 */}                    <div className="post-content"> { content } </div>
                    </>
                )
            } else {
                return (
                    <>
{/*                     <button onClick={()=> show = !show}>click me!</button>
 */}                    <div className="post-content"> { content.substring(0, 27) + "..."} </div>
                    </>
                )
            }
        } else {
            return <div className="post-content"> { content } </div>
        }
    }
    return (
        <div className="post-body">
            <div className="post-heading">
                <div className="post-title">
                    { title }
                </div>
                <div className="post-details">
                    Posted { date.toString() } by { author ? author : "an unknown author"}
                </div>
            </div>
            <ShowContent/>
        </div>
    );
}