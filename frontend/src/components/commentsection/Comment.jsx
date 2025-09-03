
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NewComment from "./NewComment";
import Timestamp from "../utils/Timestamp";
import {
  Avatar,
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { useState } from "react";

const Comment = ({
  comment,
  handleDelete,
  User,
  handleModify,
  handleReply,
  handleNewComment,
  handleDislike,
  handleLike,
  postid,
  refetchComment,
}) => {
  const [replyopen, setReplyOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [deleteopen, setDeleteOpen] = useState(false)
  const [ShowComments, setShowComments] = useState(false);
  const handleReplyClick = () => {
    console.log(open)
    setReplyOpen(!replyopen);
  };
  const handleEditClick = () => {
    console.log(editopen)
    setEditOpen(!editopen);
  };
  const handleMoreComments = () => {
    setShowComments(true);
  };
  const handleDeleteOpen = () => {
    setDeleteOpen(!deleteopen);
  };
  const Showmorecomments = () => {
    if(comment.replies.length == 0){
      return
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

  const ReplySection = () => {
    console.log("deleteopen" ,deleteopen,"editopen", editopen,"newcommentopen",replyopen)

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
    if (deleteopen){
      return(
        <>
              <Dialog
              open={deleteopen}
              onClose={handleDeleteOpen}
              >
              <DialogTitle>{"Are you sure you want to delete comment?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This action is irreversible
                </DialogContentText>
              </DialogContent>
                      <DialogActions>
          <Button variant="outlined" color=""  sx={{borderRadius:50}} onClick={handleDeleteOpen}>No</Button>
          <Button variant="outlined" color=""  sx={{borderRadius:50}} onClick={() => {handleDelete({commentid:comment.id,content:"",action:"delete"});handleClose()}}>
            Yes
          </Button>
        </DialogActions>
              </Dialog>
        </>
      )
    }
    else if (replyopen) {
      return (
        <Collapse in={replyopen} timeout={"auto"} unmountOnExit>
          <NewComment
            handleReply={handleReply}
            handleNewComment={handleNewComment}
            commentid={comment.id}
            refetchComment={refetchComment}
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
            variant="outlined"
            color=""
            onClick={() => {handleReplyClick()}}
          >
            reply
          </Button>
                    <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            onClick={() => {
              handleEditClick();
            }}
            size="small"
            variant="outlined"
            color=""
          >
            edit
          </Button>
                    <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            onClick={() => {
              handleDeleteOpen()
            }}
            size="small"
            variant="outlined"
            color=""
          >
            delete
          </Button>
        </Box>
      );
    }
  };
  if (comment.content || ShowComments) {
    console.log(comment.replyto)
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
        <Useritem time={comment.createdAt} edittime={comment.updatedAt} user={comment.user}></Useritem>
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
            likes={User ? User.likedcomments : []}
            dislikes={User ? User.dislikedcomments : []}
            id={comment.id}
            handleLike={handleLike}
            karma={comment.karma}
          ></KarmaItem>
        </Box>
        {ReplySection()}

        <Showmorecomments></Showmorecomments>
      </Box>
    );
  } else {
    return <></>;
  }
};

export default Comment;
