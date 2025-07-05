import { Box, Divider, Grid, List } from "@mui/material";

import FeedItem from "../../FeedItem";
import useGetPopularPosts from "../../hooks/useGetPopularPosts";
import InfiniteScroll from "react-infinite-scroll-component";

const Homescreen = ({ User }) => {
  const { data, error, loading, fetchMore } = useGetPopularPosts();
  console.log(loading)
  console.log(data)
  const feed = data ? data.getpopularposts : [];
  const loadmore = () => {
    fetchMore({ offset: feed.length });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <h3 style={{ textAlign: "center" }}>Popular posts</h3>
          <Divider></Divider>
          <InfiniteScroll
            dataLength={feed.length}
            next={loadmore}
            hasMore={true}
          >
            <List>
              {feed.map((item) => (
                <FeedItem item={item} User={User}></FeedItem>
              ))}
            </List>
          </InfiniteScroll>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
      </Grid>
    </Box>
  );
};
export default Homescreen;
