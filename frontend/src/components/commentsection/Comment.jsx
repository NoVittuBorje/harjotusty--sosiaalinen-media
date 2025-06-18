import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NewComment from "./NewComment";
import Timestamp from "../utils/Timestamp";
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
import Useritem from "../Useritem";
import EditComment from "./EditComment";

const Comment = ({
  comment,
  handleDelete,
  User,
  handleModify,
  handleReply,
  handleDislike,
  handleLike,
  postid,
}) => {
  console.log(comment, "1");
  const [open, setOpen] = React.useState(false);
  const [editopen, setEditOpen] = React.useState(false);
  const [ShowComments, setShowComments] = React.useState(false);
  const navigate = useNavigate();
  const handleReplyClick = () => {
    setOpen(!open);
  };
  const handleEditClick = () => {
    setEditOpen(!editopen);
  };
  const handleMoreComments = () => {
    setShowComments(true);
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
          handleModify={handleModify}
          handleDelete={handleDelete}
          handleDislike={handleDislike}
          handleLike={handleLike}
          handleReply={handleReply}
          comment={comment}
          ShowComments={ShowComments}
          User={User}
          postid={postid}
        ></MoreComments>
      );
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
              handleEditClick();
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
    if (editopen) {
      return (
        <Collapse in={editopen} timeout={"auto"} unmountOnExit>
          <EditComment
            onReply={handleModify}
            commentid={comment.id}
            oldcomment={comment.content}
            handleEditClick={handleEditClick}
          ></EditComment>
        </Collapse>
      );
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
        <Useritem time={comment.createdAt} user={comment.user}></Useritem>
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
            id={comment.id}
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
