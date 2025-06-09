import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NewComment from "./NewComment";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import MoreComments from "./MoreComments";
import useMakeComment from "../hooks/useMakeComment";
import KarmaItem from "../KarmaItem";
import { Link, useNavigate } from "react-router";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

const Comment = ({
  comment,
  handleDelete,
  User,
  handleModify,
  handleReply,
  postid,
}) => {
  console.log(comment, "1");
  const [open, setOpen] = React.useState(false);
  const [ShowComments, setShowComments] = React.useState(false);
  const navigate = useNavigate()
  const handleReplyClick = () => {
    setOpen(!open);
  };
  const handleMoreComments = () => {
    setShowComments(true);
  };
  const handleDislike = () => {
    console.log("dislike comment");
  };
  const handleLike = () => {
    console.log("like comment");
  };
  const Showmorecomments = () => {
    if (comment.replies.length == 0) {
      return;
    }
    if (ShowComments == false) {
      return (
        <Button
          size="small"
          variant="outlined"
          color=""
          onClick={handleMoreComments}
        >
          show {comment.replies.length} replies
        </Button>
      );
    } else {
      return (
        <MoreComments
          comment={comment}
          ShowComments={ShowComments}
          User={User}
          postid={postid}
        ></MoreComments>
      );
    }
  };
  const Timestamp = () => {
    console.log(comment.createdAt);
    const createdtime = new Date(Number(comment.createdAt));
    const ms = Math.abs(new Date() - createdtime);
    const sec = Math.floor(ms / 1000);

    if (sec < 60) {
      return ` ${sec} seconds ago`;
    }
    const min = Math.floor((sec / 60) << 0);
    if ((min > 0) & (min < 60)) {
      return ` ${min} minutes ago`;
    }
    const hr = Math.floor((min / 60) << 0);
    if ((hr <= 24) & (hr >= 1)) {
      return ` ${hr} hr ago`;
    }
    const days = Math.floor((hr / 24) << 0);
    if ((days > 0) & (days < 365)) {
      return ` ${days} days ago`;
    }
    const years = Math.floor((days / 365) << 0);
    if (years > 0) {
      return ` ${years} years ago`;
    }
  };
  const CommentEdit = () => {
    if (User.username === comment.user.username) {
      return (
        <>
          <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            onClick={() => {
              handleDelete(comment);
            }}
            size="small"
            variant="standard"
            color=""
          >
            delete
          </Button>
          <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            onClick={() => {
              handleModify(comment);
            }}
            size="small"
            variant="standard"
            color=""
          >
            edit
          </Button>
        </>
      );
    }
  };
  const ReplySection = () => {
    if (!User) {
      console.log("no user");
      return;
    }
    if (open) {
      return (
        <Collapse in={open} timeout={"auto"} unmountOnExit>
          <NewComment
            onReply={handleReply}
            commentid={comment.id}
            handleReplyClick={handleReplyClick}
          ></NewComment>
        </Collapse>
      );
    } else {
      return (
        <Box>
          <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            size="small"
            variant="standard"
            color=""
            onClick={handleReplyClick}
          >
            reply
          </Button>
          {CommentEdit()}
        </Box>
      );
    }
  };
  console.log(ShowComments);
  if (comment.content || ShowComments) {
    console.log(comment.content, "depth", comment.depth);

    return (
      <Box
        key={comment.id}
        sx={{
          color: "white",
          border: "2px black solid",
          borderRadius: "15px",
          padding: 0.5,
          minWidth: "100%",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <ListItemAvatar>
            <Avatar
              sx={{ width: 24, height: 24 }}
              {...stringAvatar(comment.user.username)}
            ></Avatar>
          </ListItemAvatar>
          <Button >
            <Typography
              onClick={() => {navigate(`/profile/${comment.user.id}`)}}
              color="whitesmoke"
              variant="h8"
              underline="none"
            >{`u/${comment.user.username}`}</Typography>
            </Button>
          <Typography variant="h9" sx={{ color: "grey" }}>
            {Timestamp()}
          </Typography>
        </Box>
        <Box
          sx={{
            paddingLeft: 7,
            maxWidth: "100%",
            whiteSpace: "pre-wrap",
            paddingBottom: 2,
          }}
        >
          <Typography style={{ wordWrap: "break-word" }}>
            {comment.content}
          </Typography>
        </Box>
        <Box className={"footer"}>
          <KarmaItem
            handleDislike={handleDislike}
            User={User}
            handleLike={handleLike}
            karma={comment.karma}
          ></KarmaItem>
          {ReplySection()}
        </Box>

        <Showmorecomments></Showmorecomments>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default Comment;
