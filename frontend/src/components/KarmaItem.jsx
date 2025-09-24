import { Box, IconButton, Tooltip } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useEditPost from "./hooks/useEditPost";
import useEditComment from "./hooks/useEditComment";
import useLikeComment from "./hooks/useLikeComment";
import useDislikeComment from "./hooks/useDislikeComment";
import useLikePost from "./hooks/useLikePost";
import useDislikePost from "./hooks/useDislikePost";

const KarmaItem = ({ type, id, karma, User }) => {
  const navigate = useNavigate();

  const [likesid, setlikesid] = useState([]);
  const [dislikesid, setdislikesid] = useState([]);
  const [likecomment, likecommentresult] = useLikeComment();
  const [dislikecomment, dislikecommentresult] = useDislikeComment();
  const [likepost, likepostresult] = useLikePost();
  const [dislikepost, dislikepostresult] = useDislikePost();
  var dislikes = dislikesid.map((l) => l.id);
  var likes = likesid.map((l) => l.id);
  console.log(dislikes, likes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  useEffect(() => {
    if (!User) {
      return;
    }
    if (type == "comment") {
      setdislikesid([...User.dislikedcomments]);
      setlikesid([...User.likedcomments]);
    } else {
      setdislikesid([...User.dislikedposts]);
      setlikesid([...User.likedposts]);
    }
  }, [User, type]);

  const handleDislikeComment = async ({ id }) => {
    console.log("dislike comment");
    const data = await dislikecomment({ id: id });
    setdislikesid(data.dislikeComment.dislikedcomments.map(i => i.id))
    setlikesid(data.dislikeComment.likedcomments.map(i => i.id))
    
  };
  const handleLikeComment = async ({ id }) => {
    console.log("like comment");
    const data = await likecomment({ id: id });
        if(data.dislikePost){
      setdislikesid(data.dislikeComment.dislikedcomments.map(i => i.id))
      setlikesid(data.dislikeComment.likedcomments.map(i => i.id))
    }
  };
  const handleLikePost = async () => {
    const data = await likepost({ id: id });
        if(data.dislikePost){
      setdislikesid(data.dislikePost.dislikedposts.map(i => i.id))
      setlikesid(data.dislikePost.likedposts.map(i => i.id))
    }
  };
  const handleDislikePost = async () => {
    const data = await dislikepost({ id: id });
        if(data.dislikePost){
      setdislikesid(data.dislikePost.dislikedposts.map(i => i.id))
      setlikesid(data.dislikePost.likedposts.map(i => i.id))
    }
  };
  if (!User) {
    return (
      <Box
        sx={{ backgroundColor: "background.button" }}
        className={"footerkarma"}
      >
        <Tooltip title="Login to like">
          <IconButton
            className={"button"}
            onClick={() => navigate("/login")}
            size="small"
          >
            <ArrowUpwardRoundedIcon
              style={{ color: "grey" }}
            ></ArrowUpwardRoundedIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="karma">
          <a style={{ paddingTop: 0, textAlignVertical: "top" }}>{karma}</a>
        </Tooltip>
        <Tooltip title="Login to dislike">
          <IconButton
            className={"button"}
            onClick={() => navigate("/login")}
            size="small"
          >
            <ArrowDownwardRoundedIcon
              style={{ color: "grey" }}
            ></ArrowDownwardRoundedIcon>
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  console.log(liked, disliked);

  const LikeButton = ({
    handleLikePost,
    handleLikeComment,
    id,
    likeActive,
    dislikeActive,
    setLiked,
    setDisliked,
  }) => {
    const handleClick = () => {
      setLiked(!likeActive);
      if (dislikeActive) {
        setDisliked(!dislikeActive);
      }
    };

    if (likeActive) {
      return (
        <IconButton
          onClick={() => {
            if (type == "post") {
              handleLikePost({ id });
              handleClick();
            } else {
              handleLikeComment({ id });
              handleClick();
            }
          }}
          size="small"
        >
          <Tooltip title={"like"}>
            <ArrowUpwardRoundedIcon
              style={{ color: "green" }}
            ></ArrowUpwardRoundedIcon>
          </Tooltip>
        </IconButton>
      );
    }
    return (
      <IconButton
        onClick={() => {
          if (type == "post") {
            handleLikePost({ id });
            handleClick();
          } else {
            handleLikeComment({ id });
            handleClick();
          }
        }}
        size="small"
      >
        <Tooltip title={"like"}>
          <ArrowUpwardRoundedIcon
            style={{ color: "grey" }}
          ></ArrowUpwardRoundedIcon>
        </Tooltip>
      </IconButton>
    );
  };
  const DislikeButton = ({
    handleDislikePost,
    handleDislikeComment,
    id,
    likeActive,
    dislikeActive,
    setLiked,
    setDisliked,
  }) => {
    const handleClick = () => {
      setDisliked(!dislikeActive);
      if (likeActive) {
        setLiked(!likeActive);
      }
    };

    if (dislikeActive) {
      return (
        <IconButton
          className={"button"}
          onClick={() => {
            if (type == "post") {
              handleDislikePost({ id });
              handleClick();
            } else {
              handleDislikeComment({ id });
              handleClick();
            }
          }}
          size="small"
        >
          <Tooltip title={"dislike"}>
            <ArrowDownwardRoundedIcon
              style={{ color: "red" }}
            ></ArrowDownwardRoundedIcon>
          </Tooltip>
        </IconButton>
      );
    }
    return (
      <IconButton
        className={"button"}
        onClick={() => {
          if (type == "post") {
            handleDislikePost({ id });
            handleClick();
          } else {
            handleDislikeComment({ id });
            handleClick();
          }
        }}
        size="small"
      >
        <Tooltip title={"dislike"}>
          <ArrowDownwardRoundedIcon
            style={{ color: "grey" }}
          ></ArrowDownwardRoundedIcon>
        </Tooltip>
      </IconButton>
    );
  };
  return (
    <Box
      sx={{ backgroundColor: "background.button" }}
      className={"footerkarma"}
    >
      <Tooltip title="Like">
        <LikeButton
          id={id}
          handleLikePost={handleLikePost}
          handleLikeComment={handleLikeComment}
          type={type}
          dislikeActive={disliked}
          likeActive={liked}
          setLiked={setLiked}
          setDisliked={setDisliked}
        ></LikeButton>
      </Tooltip>
      <Tooltip title="karma">
        <a style={{ paddingTop: 0, textAlignVertical: "top" }}>{karma}</a>
      </Tooltip>
      <Tooltip title="Dislike">
        <DislikeButton
          id={id}
          handleDislikePost={handleDislikePost}
          handleDislikeComment={handleDislikeComment}
          type={type}
          dislikeActive={disliked}
          likeActive={liked}
          setLiked={setLiked}
          setDisliked={setDisliked}
        ></DislikeButton>
      </Tooltip>
    </Box>
  );
};
export default KarmaItem;
