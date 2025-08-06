import { Stack, Box, Link, Paper, List } from "@mui/material";
import Comment from "../../commentsection/Comment";
import useGetUserComments from "../../hooks/useGetUserComments";
import InfiniteScroll from "react-infinite-scroll-component";
const ProfileFeedComment = (variables) => {
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
      <InfiniteScroll
        dataLength={comments.data.getusercomments.length}
        next={loadmore}
        hasMore={true}
      >
        {comments.data.getusercomments.map((item) => (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ flexDirection: "column", padding: 1 }}>
              <Box>
                <Link href="#" color="inherit">
                  <h3>{item.content}</h3>
                </Link>
              </Box>
              <Stack></Stack>
            </Box>
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default ProfileFeedComment;
