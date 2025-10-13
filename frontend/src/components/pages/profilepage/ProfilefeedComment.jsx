import { Stack, Box, Link, Paper, List, Tooltip, Typography } from "@mui/material";
import Comment from "../../commentsection/Comment";
import useGetUserComments from "../../hooks/useGetUserComments";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentSection from "../../commentsection/CommentSection";
import { useState } from "react";
const ProfileFeedComment = ({variables,User,userdata}) => {
  console.log(variables);
  const comments = useGetUserComments(variables);
  const loadmore = () => {
    comments.fetchMore({ offset: comments.data.getusercomments.length });
  };
  if (comments.loading) {
    return <Box>loading</Box>;
  }
  console.log(comments.data.getusercomments);
  let ecomments = comments.data.getusercomments.map((comment) =>{ console.log(comment)
    if(!comment.replyto){
    return({...comment,user:userdata})}else{
      sessionStorage.setItem(comment.replyto.id,true)
      return({...comment.replyto,replies:{...comment}})
    }
  })
  console.log(ecomments)
  return (
    <Box sx={{}}>
      
      <CommentSection User={User} comments={ecomments} loadmore={loadmore} loading={comments.loading} type={"profile"}></CommentSection>
    </Box>
  );
};

export default ProfileFeedComment;
