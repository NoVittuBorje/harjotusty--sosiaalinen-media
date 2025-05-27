import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import useMakeComment from '../hooks/useMakeComment';
const CommentSection = ({item,User,postid}) => {
  console.log(item)
  const [newcomment,result] = useMakeComment()
  const [comments, setComments] = useState(item);
  const [currentComment, setCurrentComment] = useState(null);
  const [Counter,setCounter] = useState(0)
  const [replyComment, setReplycomment] = useState(null)

  const handleNewComment = (content) => {
    console.log("new comment")
    console.log(content.content,postid)
    const data = newcomment({postid,content:content.content})
    console.log(data)
  };

  const handleReply = ({content,commentid}) => {
    console.log(content)
    const data = newcomment({postid,content:content,replyto:commentid})
    console.log(data)
  };
  console.log(comments)
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={handleReply}
          setCounter={setCounter}
          Counter={Counter}
        />
      ))}
      <CommentForm postid={postid} onSubmit={(comment) => handleNewComment(comment)} />
    </div>
  );
};

export default CommentSection;
