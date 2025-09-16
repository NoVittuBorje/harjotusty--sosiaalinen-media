import {
  Box,
  Divider,
  Grid,
  List,
  Select,
  MenuItem,
  FormControl,
  Button,
  CircularProgress,
} from "@mui/material";

import FeedItem from "../../FeedItem";
import useGetPopularPosts from "../../hooks/useGetPopularPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const Homescreen = ({ User }) => {
  if(!localStorage.getItem("HomeorderBy")){localStorage.setItem("HomeorderBy","POPULAR")}
  const [orderBy, setorderBy] = useState(localStorage.getItem("HomeorderBy"));
  console.log(orderBy,localStorage.getItem("HomeorderBy"))
  useEffect(() => {
    setorderBy(localStorage.getItem("HomeorderBy"))
  },[])
    useEffect(() => {
    localStorage.setItem("HomeorderBy",orderBy)
  },[orderBy])

  const variables = {
    orderBy: orderBy,
  };
  const { data, error, loading, fetchMore } = useGetPopularPosts(variables);
  console.log(loading);
  console.log(data);
  const handleChange = (event) => {
    console.log(event.target.value)
    setorderBy(event.target.value);
  };
  const feed = data ? data.getpopularposts : [];
  console.log(data, error, loading);
  const loadmore = () => {
    fetchMore({ offset: feed.length });
  };
  
  let hasmore = true;
  if (feed.length % 10 != 0 || hasmore === false) {
    console.log("no more")
    hasmore = false
  }
  const UserSubs = () => {
    if(!User){return}
    console.log(User)
    if(User.feedsubs.length > 0){
      return(
        <MenuItem value={"SUBSCRIPTIONS"}>Subscriptions</MenuItem>
      )
    }
    return
  }
  const UserFeeds = () => {
    if(!User){return}
    if(User.ownedfeeds.length > 0){
      return(
        <MenuItem value={"OWNEDFEEDS"}>Owned feeds</MenuItem>
      )
    }
    return
  }
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          
          <FormControl sx={{padding:1}}
          >
            <Select
              defaultValue={orderBy}
              name="orderBy"
              id="orderBy-select"
              sx={{ color: "inherit",border:"none"}}
              onChange={handleChange}
              open={open}
              onClose={()=> setOpen(false)}
              onOpen={() => setOpen(true)}
              value={orderBy}
            >
              <MenuItem value={"POPULAR"}>Popular</MenuItem>
              <MenuItem value={"NEWEST"}>Newest</MenuItem>
              <MenuItem value={"HOTTEST"}>Hottest</MenuItem>
              {UserSubs()}
              {UserFeeds()}
            </Select>
          </FormControl>

          <Divider></Divider>
          <InfiniteScroll
            dataLength={feed.length}
            next={loadmore}
            hasMore={hasmore}
            loader={<CircularProgress color="inherit"></CircularProgress>}
          >
            {feed.map((item) => (
              <FeedItem item={item} owner={item.owner} User={User}></FeedItem>
            ))}
          </InfiniteScroll>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
      </Grid>
    </Box>
  );
};
export default Homescreen;
