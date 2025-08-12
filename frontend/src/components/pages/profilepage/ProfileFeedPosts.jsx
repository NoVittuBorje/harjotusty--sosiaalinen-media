import { Box, Divider, Link, Typography } from "@mui/material";
import FeedItem from "../../FeedItem";
import ProfileFeedComment from "./ProfileFeedComment";
import { useNavigate } from "react-router";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import Timestamp from "../../utils/Timestamp";
import KarmaItem from "../../KarmaItem";
const ProfileFeedPosts = ({variables,userdata,User}) => {
  console.log(variables)
  const navigate = useNavigate();
  let posts = useGetUserPosts(variables);
  const loadmore = () => {
    posts.fetchMore({ offset: posts.data.getuserposts.length });
  };
  if (posts.loading) {
    return <Box>loading</Box>;
  }

  return (
    <Box>
      <InfiniteScroll
        dataLength={posts.data.getuserposts.length}
        next={loadmore}
        hasMore={true}
      >
        {posts.data.getuserposts.map((item) => (
        <FeedItem item={item} owner={userdata} User={User}></FeedItem>
        ))}
      </InfiniteScroll>
    </Box>
  );
};
export default ProfileFeedPosts;
