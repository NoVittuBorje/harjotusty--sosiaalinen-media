import { Box, Divider, Grid, List, Select , MenuItem, FormControl} from "@mui/material";

import FeedItem from "../../FeedItem";
import useGetPopularPosts from "../../hooks/useGetPopularPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const Homescreen = ({ User }) => {
  const [orderBy, setorderBy] = useState("")
  const variables = {
    orderBy:orderBy
  }
  const { data, error, loading, fetchMore } = useGetPopularPosts(variables);
  console.log(loading)
  console.log(data)
  const handleChange = (event) => {
    setorderBy(event.target.value);
  };
  const feed = data ? data.getpopularposts : [];
  console.log(data,error,loading)
  const loadmore = () => {
    fetchMore({ offset: feed.length});
  };
  console.log(orderBy)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <h3 style={{ textAlign: "center" }}>Popular posts</h3>
          <FormControl fullWidth>
          <Select defaultValue={"NEWEST"} name="orderBy" id="orderBy-select" onChange={handleChange}>
            <MenuItem value={"NEWEST"}>Newest</MenuItem>
            <MenuItem value={"POPULAR"}>Popular</MenuItem>
            <MenuItem value={"HOTTEST"}>Hottest</MenuItem>
          </Select>
          </FormControl>
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
