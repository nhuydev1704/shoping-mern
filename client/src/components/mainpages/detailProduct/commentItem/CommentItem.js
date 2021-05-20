import React, { useEffect, useState } from 'react'
import FormInput from '../formInput/FormInput'
import CommentCard from './CommentCard'

let showComments = []


function CommentItem({comment,socket}) {
    const [reply, setReply] = useState(false)
    const [name, setName] = useState('')

    const [replyComment, setReplyComment] = useState([])
    const [hideReplyComment,setHideReplyComment] = useState([])
    const [next, setNext] = useState(3)

    const loadMore = () => {
        setNext(next + 3)
    }

    useEffect(() => {
        const loopWidthSlice = () => {
            let start = comment.reply.length - next < 0 ? 0 : comment.reply.length - next
            showComments = comment.reply.slice(start, comment.reply.length)
           
            setHideReplyComment(start)
            setReplyComment(showComments)
        }


        loopWidthSlice(next)
    },[comment.reply, next])

    

    const handleReply = (username) => {
        setReply(true)
        setName(username)
    }

    const hiddenReply = () => {
        setReply(false)
        setNext(3)
    }
 
    return (
        <>
            <CommentCard comment={comment}>
                <div className="nav_comment">
                    <p onClick={() => handleReply(comment.username)}>Trả lời</p>
                    {
                        hideReplyComment > 0 &&
                        <p onClick={loadMore}>Xem thêm {hideReplyComment} bình luận</p>
                    }
                    <p onClick={hiddenReply}>Ẩn trả lời</p>
                </div>

                <div className="reply_comment">
                    {
                        replyComment.map(rep => (
                            <CommentCard comment={rep} key={rep._id}>
                                <div className="nav_comment">
                                    <p onClick={() => handleReply(rep.username)}>Trả lời</p>
                                </div>
                            </CommentCard> 
                        ))
                    }
                </div>

                {reply && 
                    <FormInput
                        id= {comment._id}
                        socket={socket}
                        name = {name}
                        setReply={setReply}
                        send="replyComment"
                     />
                } 
            </CommentCard>
        </>
    )
}

export default CommentItem
