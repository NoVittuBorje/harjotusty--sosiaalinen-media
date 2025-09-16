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
import AddBoxIcon from "@mui/icons-material/AddBox";
import UserAvatar from "../../utils/UserAvatar";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const FeedPage = ({ match, User, refetchUser }) => {
  console.log(localStorage.getItem("Feedorderby"));
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
  const { data, loading, error, fetchMore, refetch } =
    useGetFeedPosts(variables);
  const [sub, result] = useSubscribe();
  const [OpenSettings, setOpenSettings] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const handleorderByChange = (event) => {
    console.log(event.target.value);
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
        <Stack rowGap={2}>
          <Typography>Feedname: {info.feedname}</Typography>

          <Typography>Description: {info.description}</Typography>

          <Typography>
            Owner:
            <Button
              onClick={() => {
                navigate(`/profile/${info.owner.id}`);
              }}
              className="button"
              color="inherit"
              size="small"
              sx={{ borderRadius: 50 }}
            >
              <UserAvatar width={20} height={20} user={info.owner}></UserAvatar> {info.owner.username}
            </Button>
          </Typography>
          <Typography>
            Moderators:
            {info.moderators.map((mod) => {
              return(
                <Button
              onClick={() => {
                navigate(`/profile/${info.owner.id}`);
              }}
              className="button"
              color="inherit"
              size="small"
              sx={{ borderRadius: 50 }}
            >
              <UserAvatar width={20} height={20} user={mod}></UserAvatar> {mod.username}
            </Button>
              )
            } ) }
          </Typography>
          <Typography>Subs: {info.subs.length}</Typography>
        </Stack>
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
            color="inherit"
            onClick={() => Subscribe({ feedname, type: "sub" })}
          >
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
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
            color="inherit"
            onClick={() => Subscribe({ feedname, type: "unsub" })}
          >
            <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
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
            color="inherit"
            onClick={() => {
              navigate(`/newpost/${feedname}`);
            }}
          >
            <AddBoxIcon></AddBoxIcon>
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
        <Grid size={{ xs: 6, md: 2 }}></Grid>
        <Grid size={{ xs: 10, md: 8 }}>
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ alignContent:"center"}}>
                <FormControl >
                  <Select
                    defaultValue={orderBy}
                    name="orderBy"
                    id="orderBy-select"
                    sx={{ color: "inherit" }}
                    onChange={handleorderByChange}
                  >
                    <MenuItem value={"POPULAR"}>Popular</MenuItem>
                    <MenuItem value={"NEWEST"}>Newest</MenuItem>
                    <MenuItem value={"HOTTEST"}>Hottest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ alignContent: "center",paddingBottom:1 }}>
                <SubButton User={User}></SubButton>
                <NewPostButton User={User}></NewPostButton>
              </Box>
            </Box>
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
        <Grid size={2}>
          <Box>
            <FeedSettings></FeedSettings>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default FeedPage;
