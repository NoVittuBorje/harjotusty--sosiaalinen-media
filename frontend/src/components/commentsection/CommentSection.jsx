import Comment from "./Comment";
import useMakeComment from "../hooks/useMakeComment";
import { Box, CircularProgress, Collapse, IconButton } from "@mui/material";
import useEditComment from "../hooks/useEditComment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
const CommentSection = ({
  User,
  postid,
  comments,
  loadmore,
  loading,
  refetchComment,
  refetchUser,
  type,
  setmessage,
  setseverity,
}) => {
  const [newcomment, result] = useMakeComment();
  const [edit, editresult] = useEditComment();

  const handleDelete = async ({ commentid, content, action }) => {
    const data = await edit({ commentid, content, action });
  };
  const handleModify = async ({ commentid, content, action }) => {
    const data = await edit({ commentid, content, action });
  };
  const handleReply = async ({ content, commentid }) => {
    const data = await newcomment({
      postid,
      content: content,
      replyto: commentid,
    });

    refetchComment();
  };

  const handleDislike = async ({ id }) => {
    const data = await edit({
      commentid: id,
      content: "null",
      action: "dislike",
    });
  };
  const handleLike = async ({ id }) => {
    const data = await edit({ commentid: id, content: "null", action: "like" });
  };
  if (loading) {
    return <CircularProgress></CircularProgress>;
  }
  const Commentitem = ({ comment, index }) => {
    const [showComment, setShowComment] = useState(true);
    return (
      <Collapse key={index} mountOnEnter in={showComment}>
        <Comment
          User={User}
          handleDelete={handleDelete}
          handleModify={handleModify}
          handleDislike={handleDislike}
          handleLike={handleLike}
          setShowComment={setShowComment}
          ShowComment={showComment}
          key={comment.id}
          comment={comment}
          refetchComment={refetchComment}
          refetchUser={refetchUser}
          handleReply={handleReply}
          postid={postid}
          type={type}
          setmessage={setmessage}
          setseverity={setseverity}
        />
      </Collapse>
    );
  };

  let hasmore = true;
  if (comments.length % 10 != 0 || comments.length == 0) {
    hasmore = false;
  }

  return (
    <Box sx={{ maxWidth: "100%", paddingTop: 1 }}>
      <InfiniteScroll
        dataLength={comments.length}
        next={loadmore}
        hasMore={hasmore}
        loader={<CircularProgress color="inherit"></CircularProgress>}
        style={{ paddingRight: 1 }}
      >
        {comments.map((comment, index) => (
          <Commentitem comment={comment} index={index}></Commentitem>
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default CommentSection;
