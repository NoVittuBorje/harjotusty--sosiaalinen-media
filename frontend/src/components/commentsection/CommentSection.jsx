import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import useMakeComment from "../hooks/useMakeComment";
import { Box } from "@mui/material";
import useEditComment from "../hooks/useEditComment";
import InfiniteScroll from "react-infinite-scroll-component";
const CommentSection = ({ User, postid,comments,loadmore,loading}) => {
  const [newcomment, result] = useMakeComment();
  const [edit, editresult] = useEditComment();
  const handleDelete = ({id}) => {
    console.log(id);
  };
  const handleModify = async ({ commentid, content, action }) => {
    const data = await edit({ commentid, content, action });
    console.log(data);
  };
  const handleReply = async ({content, commentid,refetchComment}) => {
    console.log(content);
    const data = await newcomment({ postid, content: content, replyto: commentid });
    console.log(data);
    refetchComment()
  }
  const refetchComment = () => {

  }
  const handleDislike = async ({id}) => {
    console.log("dislike comment");
    console.log(id)
    const data = await edit({ commentid:id, content:"null", action:"dislike" })
    console.log(data)
  };
  const handleLike = async ({id}) => {
    console.log("like comment");
    console.log(id)
    const data = await edit({ commentid:id, content:"null", action:"like" })
    console.log(data)
  };
  if(loading){
    return <Box>loading...</Box>
  }

  
  console.log(comments);

  return (
    <Box>
      <InfiniteScroll dataLength={comments.length} next={loadmore} hasMore={true} loader={<></>}>
      {comments.map((comment,index) => (
        <Box key={index} sx={{ paddingBottom: 0.5, marginRight: 2, marginLeft: 1 }}>
          <Comment
            User={User}
            handleDelete={handleDelete}
            handleModify={handleModify}
            handleDislike={handleDislike}
            handleLike={handleLike}
            key={comment.id}
            comment={comment}
            handleReply={handleReply}
            refetchComment={refetchComment}
            postid={postid}
          />
          
        </Box>
      ))}
      </InfiniteScroll>
    </Box>
  );
};

export default CommentSection;
