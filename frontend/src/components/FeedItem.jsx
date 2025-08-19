import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
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
const FeedItem = ({ item,owner, User }) => {
  const navigate = useNavigate();
  const [edit, editresult] = useEditPost();
  const handleLike = async () => {
    console.log("likepost");
    const data = await edit({ action: "like", content: "", postid: item.id });

  };
  const handleDislike = async () => {
    console.log("dislikepost");
    const data = await edit({ action: "dislike", content: "", postid: item.id });
    console.log(data);
  };

  return (
    <Box className={"feed"} key={item.id}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link
          
          onClick={() => {
            navigate(`/post/${item.id}`);
          }}
          variant="inherit"
          underline="none"
          color="white"
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
                <Button>
                  <Typography
                    color="whitesmoke"
                    variant="h8"
                    underline="none"
                    onClick={(event) => {event.stopPropagation();navigate(`/feed/${item.feed.feedname}`)}}
                  >{`in f/${item.feed.feedname}`}
                  
                  </Typography>
                  </Button>
              </Box>
              <Typography className="feedDesc" variant="h7" color="#c4c3c0">
                {item.description}
              </Typography>
            </Box>
          </Box>
        </Link>
        <Divider></Divider>
        <Box className={"footer"}>
          <KarmaItem
            handleDislike={handleDislike}
            handleLike={handleLike}
            likes={User ? User.likedposts : []}
            dislikes={User ? User.dislikedposts : []}
            karma={item.karma}
            id={item.id}
            User={User}
          ></KarmaItem>
          
        </Box>
      </Box>

      <Divider></Divider>
    </Box>
  );
};
export default FeedItem;
