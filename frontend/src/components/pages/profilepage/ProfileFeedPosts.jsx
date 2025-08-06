import { Box, Divider, Link, Typography } from "@mui/material";
import FeedItem from "../../FeedItem";
import ProfileFeedComment from "./ProfileFeedComment";
import { useNavigate } from "react-router";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import Timestamp from "../../utils/Timestamp";
const ProfileFeedPosts = (variables) => {
  const navigate = useNavigate();
  const posts = useGetUserPosts(variables);
  const loadmore = () => {
    posts.fetchMore({ offset: posts.data.getuserposts.length });
  };
  if (posts.loading) {
    return <Box>loading</Box>;
  }
  console.log(posts.data.getuserposts);
  return (
    <Box>
      <InfiniteScroll
        dataLength={posts.data.getuserposts.length}
        next={loadmore}
        hasMore={true}
      >
        {posts.data.getuserposts.map((item) => (
          <Box className={"feed"} key={item.id}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                onClick={() => {
                  navigate(`/post/${item.id}`);
                }}
                variant="inherit"
                underline="none"
                color="white"
              >
                <Box sx={{ flexDirection: "column", padding: 1 }}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                        marginBottom: 1,
                      }}
                    >
                      <Typography variant="h5">{`${item.headline}`}</Typography>
                      <Timestamp
                        time={item.createdAt}
                        edittime={item.updatedAt}
                      ></Timestamp>
                      <Typography>{`in f/${item.feed.feedname}`}</Typography>
                    </Box>
                    <Typography
                      className="feedDesc"
                      variant="h7"
                      color="#c4c3c0"
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Link>
              <Divider></Divider>
            </Box>
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
};
export default ProfileFeedPosts;
