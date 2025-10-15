import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import parse from "html-react-parser";

import useEditFeed from "../../hooks/useEditFeed";
import EditFeedDesc from "./EditFeedDesc";
import FeedModSettings from "./FeedModSettings";
import FeedAvatar from "../../utils/FeedAvatar";
import ExpandIcon from "../../utils/ExpandIcon";

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
  const [editfeed, resultedit] = useEditFeed();
  const [sub, resultsub] = useSubscribe();
  const [OpenSettings, setOpenSettings] = useState(false);
  const [FeedEditOpen, setFeedEditOpen] = useState(false);
  const handleSave = async ({ content, feedid, action }) => {
    console.log("save");
    console.log(feedid);
    const data = await editfeed({
      content,
      feedid,
      action,
    });
    console.log(data);
    if (data.modifyFeed) {
      setFeedEditOpen(false);
    }
  };
  const handleorderByChange = (event) => {
    console.log(event.target.value);
    setorderBy(event.target.value);
  };
  const Subscribe = async ({ feedname, type }) => {
    console.log("Subscribe");
    const data = await sub({ feedname, type });
    console.log(data);
    refetchUser();
    feedinfo.refetch()
  };

  const FeedInfo = ({ info, infoloading }) => {
    const [OpenModeratorShow, setOpenModeratorShow] = useState(false);
    if (infoloading) {
      return <CircularProgress color="inherit"></CircularProgress>;
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "background.dark",
          borderRadius: 5,
          padding: 1,
          border: "1px solid",
        }}
      >
        <Stack spacing={1}>
          <Typography>Feed info: </Typography>
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
              <UserAvatar width={20} height={20} user={info.owner}></UserAvatar>{" "}
              {info.owner.username}
            </Button>
          </Typography>
          <Typography>
            Moderators:
            <Button
              onClick={() => {
                setOpenModeratorShow(!OpenModeratorShow);
              }}
              className="button"
              color="inherit"
              size="small"
              sx={{ borderRadius: 50 }}
            >
              show {info.moderators.length}
              <ExpandIcon Open={OpenModeratorShow}></ExpandIcon>
            </Button>
            <Collapse in={OpenModeratorShow}>
              <Stack>
                {info.moderators.map((mod) => {
                  return (
                    <Box>
                      <Button
                        onClick={() => {
                          navigate(`/profile/${mod.id}`);
                        }}
                        className="button"
                        color="inherit"
                        size="small"
                        sx={{ borderRadius: 50 }}
                      >
                        <UserAvatar
                          width={20}
                          height={20}
                          user={mod}
                        ></UserAvatar>{" "}
                        {mod.username}
                      </Button>
                    </Box>
                  );
                })}
              </Stack>
            </Collapse>
          </Typography>
          <Typography>Subs: {info.subs.length}</Typography>
        </Stack>
      </Box>
    );
  };
  const FeedDescription = ({ info, infoloading, FeedEditOpen }) => {
    if (infoloading) {
      return <CircularProgress color="inherit"></CircularProgress>;
    }

    return (
      <Box sx={{ padding: 1 }}>
        <Stack direction={"column"}>
          <Stack direction={"row"} alignItems={"center"} gap={2} padding={1}>
            <FeedAvatar width={100} height={100} feed={info}></FeedAvatar>
            <Typography variant="h5">f/{info.feedname}</Typography>
          </Stack>
          <Box>{parse(info.description)}</Box>
        </Stack>
        <Collapse in={FeedEditOpen}>
          <EditFeedDesc
            setOpen={setFeedEditOpen}
            handleSave={handleSave}
            feed={info}
          ></EditFeedDesc>
        </Collapse>
      </Box>
    );
  };

  const FeedSettings = ({ info, infoloading }) => {
    const ModSettingIcon = ({ mods, User }) => {
      if (!mods || !User) {
        return;
      }
      if (mods.includes(User.id))
        return (
          <IconButton
            className={"button"}
            sx={{ color: "inherit" }}
            onClick={() => setOpenSettings(!OpenSettings)}
          >
            <SettingsIcon></SettingsIcon>
          </IconButton>
        );
    };
    if (infoloading) {
      return;
    }
    const mods = [...info.moderators.map((mod) => mod.id), info.owner.id];
    console.log(mods);
    return (
      <Box>
        <ModSettingIcon mods={mods} User={User}></ModSettingIcon>
        <Collapse
          sx={{
            backgroundColor: "background.dark",
            borderRadius: 5,
            padding: 1,
            border: "1px solid",
          }}
          in={OpenSettings}
        >
          <FeedModSettings
            mods={mods}
            User={User}
            setFeedEditOpen={setFeedEditOpen}
            item={info}
          ></FeedModSettings>
        </Collapse>
      </Box>
    );
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
  let info = feedinfo.data ? feedinfo.data.getfeed : {};
  let infoloading = feedinfo.loading;
  info = info[0];
  let hasmore = true;
  if (feed.length % 10 != 0 || hasmore === false || feed.length == 0) {
    console.log("no more");
    hasmore = false;
  }
  const loadmore = () => {
    console.log("loadmore");
    if (feed.length % 10 == 0) {
      fetchMore({ offset: feed.length });
      hasmore = false;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 2, sm: 0 }}></Grid>
        <Grid size={{ xs: 12, md: 8, sm: 9 }}>
          <Box>
            <FeedDescription
              infoloading={infoloading}
              info={info}
              feed={feed}
              FeedEditOpen={FeedEditOpen}
            ></FeedDescription>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ alignContent: "center" }}>
                <FormControl>
                  <Select
                    defaultValue={orderBy}
                    name="orderBy"
                    id="orderBy-select"
                    sx={{ color: "inherit" }}
                    size="small"
                    onChange={handleorderByChange}
                  >
                    <Typography sx={{ paddingLeft: 2 }}>Sort by</Typography>
                    <MenuItem value={"POPULAR"}>Popular</MenuItem>
                    <MenuItem value={"NEWEST"}>Newest</MenuItem>
                    <MenuItem value={"HOTTEST"}>Hottest</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ alignContent: "center", paddingBottom: 1 }}>
                <SubButton User={User}></SubButton>
                <NewPostButton User={User}></NewPostButton>
              </Box>
            </Box>
            <Divider></Divider>

            <InfiniteScroll
              dataLength={feed.length}
              next={loadmore}
              hasMore={hasmore}
              loader={<CircularProgress color="inherit"></CircularProgress>}
            >
              {feed.map((item) => (
                <FeedItem
                  item={item}
                  owner={item.owner}
                  mods={info ? [...info.moderators, info.owner.id] : []}
                  User={User}
                ></FeedItem>
              ))}
            </InfiniteScroll>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2, sm: 3 }}>
          <FeedInfo info={info} infoloading={infoloading}></FeedInfo>
          <FeedSettings info={info} infoloading={infoloading}></FeedSettings>
        </Grid>
      </Grid>
    </Box>
  );
};
export default FeedPage;
