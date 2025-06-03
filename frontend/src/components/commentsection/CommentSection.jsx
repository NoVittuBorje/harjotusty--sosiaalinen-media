import React, { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import useMakeComment from '../hooks/useMakeComment';
import { Box } from '@mui/material';
const CommentSection = ({item,User,postid}) => {
  console.log(item)
  const [newcomment,result] = useMakeComment()
  const [comments, setComments] = useState(item);
  const [Counter,setCounter] = useState(0)
  const handleNewComment = (content) => {
    console.log("new comment")
    console.log(content.content,postid)
    const data = newcomment({postid,content:content.content})
    console.log(data)
  };
  const handleDelete = (comment) => {
    console.log(comment)
  }
  const handleModify = (comment) => {
    console.log(comment)
  }
  const handleReply = ({content,commentid}) => {
    console.log(content)
    const data = newcomment({postid,content:content,replyto:commentid})
    console.log(data)
  };
  console.log(comments)
  return (
    <Box>
      <CommentForm postid={postid} onSubmit={(comment) => handleNewComment(comment)} />
      {comments.map((comment) => (
        <Box sx={{paddingBottom:0.5, marginRight:2,marginLeft:1}}>
        <Comment
          User={User}
          handleDelete={handleDelete}
          handleModify={handleModify}
          key={comment.id}
          comment={comment}
          onReply={handleReply}
          setCounter={setCounter}
          Counter={Counter}
          setComments={setComments}
        />
        </Box>
      ))}
      
    </Box>
  );
};

export default CommentSection;
