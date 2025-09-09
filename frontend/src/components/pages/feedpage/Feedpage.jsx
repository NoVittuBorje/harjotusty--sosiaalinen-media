import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import useGetFeed from "../../hooks/useGetFeed";
import { useNavigate } from "react-router";
import FeedItem from "../../FeedItem";
import useSubscribe from "../../hooks/useSubscribe";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import UserAvatar from "../../utils/Avatar";
const FeedPage = ({ match, User, refetchUser }) => {
  console.log(localStorage.getItem("Feedorderby"))
  if (!localStorage.getItem("FeedorderBy")) {
    localStorage.setItem("FeedorderBy", "POPULAR");
    console.log("joo");
  }
  const [orderBy, setorderBy] = useState(localStorage.getItem("FeedorderBy"));

  console.log(orderBy, localStorage.getItem("FeedorderBy"));
  useEffect(() => {
    setorderBy(localStorage.getItem("FeedorderBy"));
  }, []);
  useEffect(() => {
    localStorage.setItem("FeedorderBy", orderBy);
  }, [orderBy]);

  const feedname = match.params.feedname;
  const variables = {
    orderBy: orderBy,
    feedname: feedname,
  };

  const navigate = useNavigate();
  const feedinfo = useGetFeed({ feedname });
  const { data, loading, error, fetchMore } = useGetFeedPosts(variables);
  const [sub, result] = useSubscribe();
  const [OpenSettings, setOpenSettings] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const handleorderByChange = (event) => {
    console.log(event.target.value)
    setorderBy(event.target.value);
  };
  const Subscribe = async ({ feedname, type }) => {
    console.log("Subscribe");
    const data = await sub({ feedname, type });
    console.log(data);
    refetchUser();
  };
  
  const FeedInfo = () => {
    if (feedinfo.loading) {
      return <Box>loading</Box>;
    }
    let info = feedinfo.data ? feedinfo.data.getfeed : {};
    info = info[0];
    console.log(info);
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <Typography>{info.feedname}</Typography>
        </Box>
        <Box>
          <Typography>{info.description}</Typography>
        </Box>
        <Box>
          <Typography>
            Owner: {info.owner.username}{" "}
            <UserAvatar user={info.owner}></UserAvatar>
          </Typography>
        </Box>
      </Box>
    );
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
              <FeedInfo></FeedInfo>
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
        <Box sx={{ verticalAlign: "middle" }}>
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
      setHasMore(false);
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
          
          <FormControl>
            <Select
              defaultValue={orderBy}
              name="orderBy"
              id="orderBy-select"
              sx={{ color: "white" }}
              onChange={handleorderByChange}
            >
              <MenuItem value={"POPULAR"}>Popular</MenuItem>
              <MenuItem value={"NEWEST"}>Newest</MenuItem>
              <MenuItem value={"HOTTEST"}>Hottest</MenuItem>
            </Select>
          </FormControl>
            <Divider></Divider>

            <InfiniteScroll
              dataLength={feed.length}
              next={loadmore}
              hasMore={hasMore}
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
          <Box>
            <FeedSettings></FeedSettings>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default FeedPage;
