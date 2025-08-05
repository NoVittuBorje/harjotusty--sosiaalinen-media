import { Box, Button, Divider, Grid, List } from "@mui/material";
import useGetFeed from "../../hooks/useGetFeed";
import { useNavigate } from "react-router";
import FeedItem from "../../FeedItem";
import useSubscribe from "../../hooks/useSubscribe";
import InfiniteScroll from "react-infinite-scroll-component"
import useGetFeedPosts from "../../hooks/useGetFeedPosts";


const FeedPage = ({ match, User,refetchUser }) => {
  console.log(match.params.feedname);
  const feedname = match.params.feedname;
  const navigate = useNavigate();
  const { data, loading, error,fetchMore } = useGetFeedPosts({feedname})
  const [sub, result] = useSubscribe();
  const Subscribe = async ({ feedname, type }) => {
    console.log("Subscribe");
    const data = await sub({ feedname, type });
    console.log(data);
    refetchUser()
    
  };
  const subButton = ({ User }) => {
    if (!User) {
      return;
    }
    if (!User.feedsubs.find((e) => e.feedname === feedname)) {
      return (
        <Button onClick={() => Subscribe({ feedname, type: "sub" })}>
          Subscribe
        </Button>
      );
    } else {
      return (
        <Button onClick={() => Subscribe({ feedname, type: "unsub" })}>
          unSubscribe
        </Button>
      );
    }
  };
  const newPostButton = ({ User }) => {
    if (!User) {
      return;
    } else {
      return (
        <Button
          onClick={() => {
            navigate(`/newpost/${feedname}`);
          }}
        >
          Make new Post
        </Button>
      );
    }
  };

  console.log(data, loading, error);
  const feed = data ? data.getfeedposts : [];

    const loadmore = () => {
    console.log("loadmore")
    fetchMore({offset:feed.length})
    }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
          <Grid size={{ xs: 12, md: 2 }}>{subButton({ User })}</Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              <h3 style={{ textAlign: "center" }}>{match.params.feedname} Posts</h3>
              <Divider></Divider>
              
              <InfiniteScroll dataLength={feed.length} next={loadmore} hasMore={true}>
                <List>
                {feed.map((item) => (
                  <FeedItem item={item} User={User}></FeedItem>
                ))}
              </List>
              </InfiniteScroll>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>{newPostButton({ User })}</Grid>
        </Grid>
      </Box>
    );
  
};
export default FeedPage;
