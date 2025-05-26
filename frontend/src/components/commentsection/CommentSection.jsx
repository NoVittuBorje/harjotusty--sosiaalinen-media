import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import useMakeComment from '../hooks/useMakeComment';
const CommentSection = ({item,User,postid}) => {
  console.log(item)
  const [newcomment,result] = useMakeComment()
  const [comments, setComments] = useState(item);
  const [currentComment, setCurrentComment] = useState(null);

  const [replyComment, setReplycomment] = useState(null)

  const handleNewComment = (content) => {
    console.log("new comment")
    console.log(content.content,postid)
    const data = newcomment({postid,content:content.content})
    console.log(data)
  };

  const handleReply = (commentId, reply) => {
    const updatedComments = comments.map((comment) => {
        console.log(comment.replies)
      if (comment.id === commentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return comment;
    });
    setComments(updatedComments);
  };
  console.log(comments)
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={(reply) => handleReply(comment.id, reply)}
        />
      ))}
      <CommentForm postid={postid} onSubmit={(comment) => handleNewComment(comment)} />
    </div>
  );
};

export default CommentSection;
