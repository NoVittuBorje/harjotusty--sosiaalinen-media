import { Box, Button, Divider, Grid, List } from "@mui/material";
import useGetFeed from "../../hooks/useGetFeed";
import { useNavigate } from "react-router";
import FeedItem from "../../FeedItem";
import useSubscribe from "../../hooks/useSubscribe";

const FeedPage = ({ match, User, setUser,refetchUser }) => {
  console.log(match.params.feedname);
  const feedname = match.params.feedname;
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useGetFeed({ feedname });
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
  if (loading) {
    return <Box>Loading ...</Box>;
  } else {
    console.log(data);
    const feed = data.getfeed[0];
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          <h1>{feed.feedname}</h1>
        </Box>
        <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
          <Grid size={{ xs: 12, md: 2 }}>{subButton({ User })}</Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              <h3 style={{ textAlign: "center" }}>Posts</h3>
              <Divider></Divider>
              <List>
                {feed.posts.map((item) => (
                  <FeedItem item={item} User={User}></FeedItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>{newPostButton({ User })}</Grid>
        </Grid>
      </Box>
    );
  }
};
export default FeedPage;
