import { Stack, Box, Link, Paper, List, Tooltip, Typography } from "@mui/material";
import Comment from "../../commentsection/Comment";
import useGetUserComments from "../../hooks/useGetUserComments";
import InfiniteScroll from "react-infinite-scroll-component";
import KarmaItem from "../../KarmaItem";
import CommentSection from "../../commentsection/CommentSection";
const ProfileFeedComment = ({variables,User}) => {
  console.log(variables);
  const comments = useGetUserComments(variables);
  const loadmore = () => {
    comments.fetchMore({ offset: comments.data.getusercomments.length });
  };
  if (comments.loading) {
    return <Box>loading</Box>;
  }
  console.log(comments.data.getusercomments);
  return (
    <Box sx={{}}>
      <CommentSection User={User} comments={comments.data.getusercomments} loadmore={loadmore} loading={comments.loading}></CommentSection>
    </Box>
  );
};

export default ProfileFeedComment;
