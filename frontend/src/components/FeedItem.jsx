import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { useNavigate } from "react-router";
import KarmaItem from "./KarmaItem";
import Timestamp from "./utils/Timestamp";
import Useritem from "./Useritem";
import useEditPost from "./hooks/useEditPost";
import SettingsIcon from "@mui/icons-material/Settings";
import parse from "html-react-parser";
import { useState } from "react";
import PostModSettings from "./utils/PostModSettings";
import useGetImageUrl from "./hooks/useGetImageUrl";
const FeedItem = ({ item, owner, User, mods }) => {
  const navigate = useNavigate();
  const [edit, editresult] = useEditPost();
  const [open, setOpen] = useState(false);

  const ModSettings = () => {
    
    if (!mods | !User) {
      return;
    }
    if (mods.includes(User.id))
      return (
        <IconButton
          onClick={() => {
            setOpen(!open);
          }}
        >
          <SettingsIcon></SettingsIcon>
        </IconButton>
      );
  };
  const FeedImage = ({ img }) => {
    const { data, loading } = useGetImageUrl({ imageId: img });
    if (!loading) {
      
      return (
        <img
          src={data.getImage}
          style={{ maxHeight: 500, maxWidth: "100%",borderRadius:15 }}
        ></img>
      );
    }
  };
  const FeedDescription = ({ item }) => {
    if (item.img) {
      return (
        <Box className="imagecontainer" >
          <FeedImage img={item.img}></FeedImage>
        </Box>
      );
    } else {
      return <Box className="feedDesc">{parse(item.description)}</Box>;
    }
  };
  return (
    <Box>
    <Box
      className={"feed"}
      sx={{
        "&:hover": {
          backgroundColor: "background.hover",
        },
      }}
      key={item.id}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link
          onClick={() => {
            navigate(`/post/${item.id}`);
          }}
          variant="inherit"
          underline="none"
          color="inherit"
        >
          <Box sx={{ flexDirection: "column", padding: 1 }}>
            <Useritem time={item.createdAt} user={owner}></Useritem>

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
                <Button
                  size="small"
                  color="inherit"
                  className="button"
                  sx={{ borderRadius: 50 }}
                >
                  <Typography
                    color="inherit"
                    variant="h8"
                    underline="none"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/feed/${item.feed.feedname}`);
                    }}
                  >
                    {`f/${item.feed.feedname}`}
                  </Typography>
                </Button>
              </Box>
              <FeedDescription item={item}></FeedDescription>
            </Box>
          </Box>
        </Link>
        
        <Box className={"footer"}>
          <KarmaItem
            type={"post"}
            karma={item.karma}
            id={item.id}
            User={User}
          ></KarmaItem>
          <ModSettings></ModSettings>
        </Box>
        
        <Collapse in={open}>
          <Divider></Divider>
          <PostModSettings item={item}></PostModSettings>
        </Collapse>
      </Box>
     
    </Box>
    <Divider ></Divider>
    </Box>
  );
};
export default FeedItem;
