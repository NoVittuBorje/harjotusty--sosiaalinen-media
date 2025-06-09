import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import useMakeComment from "../hooks/useMakeComment";
import { Box } from "@mui/material";
const CommentSection = ({ item, User, postid }) => {
  console.log(item);
  const [newcomment, result] = useMakeComment();
  const [comments, setComments] = useState(item);

  const handleDelete = (comment) => {
    console.log(comment);
  };
  const handleModify = (comment) => {
    console.log(comment);
  };
  const handleReply = ({ content, commentid }) => {
    console.log(content);
    const data = newcomment({ postid, content: content, replyto: commentid });
    console.log(data);
  };
  console.log(comments);
  return (
    <Box>
      {comments.map((comment) => (
        <Box sx={{ paddingBottom: 0.5, marginRight: 2, marginLeft: 1 }}>
          <Comment
            User={User}
            handleDelete={handleDelete}
            handleModify={handleModify}
            key={comment.id}
            comment={comment}
            handleReply={handleReply}
            setComments={setComments}
            postid={postid}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CommentSection;
