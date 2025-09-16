import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NewComment from "./NewComment";
import {
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MoreComments from "./MoreComments";
import KarmaItem from "../KarmaItem";
import Useritem from "../Useritem";
import EditComment from "./EditComment";
import { useState } from "react";
import useMakeComment from "../hooks/useMakeComment";
import useEditComment from "../hooks/useEditComment";

const Comment = ({
  comment,
  handleDelete,
  User,
  handleModify,
  refetchComment,
  handleNewComment,
  postid,
}) => {
  const [replyopen, setReplyOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [deleteopen, setDeleteOpen] = useState(false);
  const [ShowComments, setShowComments] = useState(false);
  const [newcomment, result] = useMakeComment();
  const [edit, editresult] = useEditComment();
  const handleReplyClick = () => {
    console.log(open);
    setReplyOpen(!replyopen);
  };
  const handleReply = async ({ content, commentid }) => {
    console.log(content);
    const data = await newcomment({
      postid,
      content: content,
      replyto: commentid,
    });
    console.log(data);
    refetchComment();
    setReplyOpen(!replyopen);
  };
    const handleDel = async ({commentid,content,action}) => {
    console.log(commentid,action);
    const data = await edit({commentid,content,action})
    console.log(data)
  };
  const handleMod = async ({ commentid, content, action }) => {
    const data = await edit({ commentid, content, action });
    console.log(data);
  };
  const handleDis = async ({ id }) => {
    console.log("dislike comment");
    console.log(id);
    const data = await edit({
      commentid: id,
      content: "null",
      action: "dislike",
    });
    console.log(data);
  };
  const handleLi = async ({ id }) => {
    console.log("like comment");
    console.log(id);
    const data = await edit({ commentid: id, content: "null", action: "like" });
    console.log(data);
  };
  const handleEditClick = () => {
    console.log(editopen);
    setEditOpen(!editopen);
  };
  const handleMoreComments = () => {
    setShowComments(true);
  };
  const handleDeleteOpen = () => {
    setDeleteOpen(!deleteopen);
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
          color="inherit"
          onClick={handleMoreComments}
        >
          show {comment.replies.length} replies
        </Button>
      );
    } else {
      return (
        <MoreComments
          handleModify={handleMod}
          handleDelete={handleDel}
          handleDislike={handleDis}
          handleLike={handleLi}
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
    if (deleteopen) {
      return (
        <>
          <Dialog open={deleteopen} onClose={handleDeleteOpen}>
            <DialogTitle>
              {"Are you sure you want to delete comment?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>This action is irreversible</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ borderRadius: 50 }}
                onClick={handleDeleteOpen}
              >
                No
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ borderRadius: 50 }}
                onClick={() => {
                  handleDelete({
                    commentid: comment.id,
                    content: "",
                    action: "delete",
                  });
                  handleDeleteOpen();
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    } else if (replyopen) {
      return (
        <Collapse in={replyopen} timeout={"auto"} unmountOnExit>
          <NewComment
            handleReply={handleReply}
            handleNewComment={handleNewComment}
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
            variant="outlined"
            color="inherit"
            onClick={() => {
              handleReplyClick();
            }}
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
            color="inherit"
          >
            edit
          </Button>
          <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            onClick={() => {
              handleDeleteOpen();
            }}
            size="small"
            variant="outlined"
            color="inherit"
          >
            delete
          </Button>
        </Box>
      );
    }
  };
  if (comment.content || ShowComments) {
    return (
      <Box
        key={comment.id}
        sx={{
          color: "inherit",
          border:"1px black solid",
          borderRadius:2,
          padding: 0.5,
          minWidth: "100%",
          maxWidth: "100%",
        }}
      >
        <Useritem
          time={comment.createdAt}
          edittime={comment.updatedAt}
          user={comment.user}
        ></Useritem>
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
            handleDislike={handleDis}
            User={User}
            likes={User ? User.likedcomments : []}
            dislikes={User ? User.dislikedcomments : []}
            id={comment.id}
            handleLike={handleLi}
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
