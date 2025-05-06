import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
const CommentSection = ({item}) => {
  console.log(item)
  const [comments, setComments] = useState(item);
  const [currentComment, setCurrentComment] = useState(null);

  const handleNewComment = (comment) => {
    setComments([...comments, comment]);
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

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={(reply) => handleReply(comment.id, reply)}
        />
      ))}
      <CommentForm onSubmit={(comment) => handleNewComment(comment)} />
    </div>
  );
};

export default CommentSection;
