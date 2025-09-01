import { Box, Button, Collapse, Divider, Grid, IconButton, List, Stack } from "@mui/material";
import useGetFeed from "../../hooks/useGetFeed";
import { useNavigate } from "react-router";
import FeedItem from "../../FeedItem";
import useSubscribe from "../../hooks/useSubscribe";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
const FeedPage = ({ match, User, refetchUser }) => {
  console.log(match.params.feedname);
  const feedname = match.params.feedname;
  const navigate = useNavigate();
  const { data, loading, error, fetchMore } = useGetFeedPosts({ feedname });
  const [sub, result] = useSubscribe();
  const [OpenSettings, setOpenSettings] = useState(false);
  const Subscribe = async ({ feedname, type }) => {
    console.log("Subscribe");
    const data = await sub({ feedname, type });
    console.log(data);
    refetchUser();
  };
  const FeedSettings = () => {
    if (!OpenSettings) {
      return (
        <IconButton onClick={() => setOpenSettings(!OpenSettings)}>
          <SettingsIcon></SettingsIcon>
        </IconButton>
      );
    } else {
      return (
        <Collapse in={OpenSettings}>
          <Box>
            <IconButton onClick={() => setOpenSettings(!OpenSettings)}>
              <SettingsIcon></SettingsIcon>
            </IconButton>
            <Stack padding={1} gap={1}>
              <SubButton User={User}></SubButton>
              <NewPostButton User={User}></NewPostButton>
            </Stack>
          </Box>
        </Collapse>
      );
    }
  };
  const SubButton = ({ User }) => {
    if (!User) {
      return;
    }
    if (!User.feedsubs.find((e) => e.feedname === feedname)) {
      return (
        <Box>
        <Button
          className={"button"}
          style={{ borderRadius: 50 }}
          size="small"
          variant="outlined"
          color=""
          onClick={() => Subscribe({ feedname, type: "sub" })}
        >
          Subscribe
        </Button>
        </Box>
      );
    } else {
      return (
        <Box sx={{verticalAlign:"middle",}}>
        <Button
          className={"button"}
          style={{ borderRadius: 50 }}
          size="small"
          variant="outlined"
          color=""
          onClick={() => Subscribe({ feedname, type: "unsub" })}
        >
          unSubscribe
        </Button>
        </Box>
      );
    }
  };
  const NewPostButton = ({ User }) => {
    if (!User) {
      return;
    } else {
      return (
        <Box>
        <Button
          className={"button"}
          style={{ borderRadius: 50 }}
          size="small"
          variant="outlined"
          color=""
          onClick={() => {
            navigate(`/newpost/${feedname}`);
          }}
        >
          Make new Post
        </Button>
        </Box>
      );
    }
  };

  console.log(data, loading, error);
  const feed = data ? data.getfeedposts : [];

  const loadmore = () => {
    console.log("loadmore");
    if (feed.length % 10 == 0) {
      fetchMore({ offset: feed.length });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "20%",
              }}
            >

              <h3 style={{ position: "center" }}>
                {match.params.feedname} Posts
              </h3>


            </Box>

            <Divider></Divider>

            <InfiniteScroll
              dataLength={feed.length}
              next={loadmore}
              hasMore={true}
            >
              <List>
                {feed.map((item) => (
                  <FeedItem
                    item={item}
                    owner={item.owner}
                    User={User}
                  ></FeedItem>
                ))}
              </List>
            </InfiniteScroll>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <FeedSettings></FeedSettings>
        </Grid>
      </Grid>
    </Box>
  );
};
export default FeedPage;
