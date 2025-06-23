import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import useMakeComment from "../hooks/useMakeComment";
import { Box } from "@mui/material";
import useEditComment from "../hooks/useEditComment";
const CommentSection = ({ item, User, postid, refetchUser,refetch}) => {
  console.log(item);
  const [newcomment, result] = useMakeComment();
  const [edit, editresult] = useEditComment();
  console.log(editresult);
  const handleDelete = (comment) => {
    console.log(comment);
  };
  const handleModify = async ({ commentid, content, action }) => {
    const data = await edit({ commentid, content, action });
    console.log(data);
    refetch()
  };
  const handleReply = async ({ content, commentid }) => {
    console.log(content);
    const data = await newcomment({ postid, content: content, replyto: commentid });
    console.log(data);
    refetch()
  };
  const handleDislike = async ({id}) => {
    console.log("dislike comment");
    console.log(id)
    const data = await edit({ commentid:id, content:"null", action:"dislike" })
    console.log(data)
    refetchUser()
    refetch()
  };
  const handleLike = async ({id}) => {
    console.log("like comment");
    console.log(id)
    const data = await edit({ commentid:id, content:"null", action:"like" })
    console.log(data)
    refetchUser()
    refetch()
  };
  const comments = item;
  console.log(comments);
  return (
    <Box>
      {comments.map((comment) => (
        <Box sx={{ paddingBottom: 0.5, marginRight: 2, marginLeft: 1 }}>
          <Comment
            User={User}
            handleDelete={handleDelete}
            handleModify={handleModify}
            handleDislike={handleDislike}
            handleLike={handleLike}
            refetchUser={refetchUser}
            key={comment.id}
            comment={comment}
            handleReply={handleReply}
            postid={postid}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CommentSection;
