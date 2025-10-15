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
import formatNumber from "./utils/FormatNumber";

const KarmaItem = ({ type, id, karma, User }) => {
  const navigate = useNavigate();
  const [likecomment, likecommentresult] = useLikeComment();
  const [dislikecomment, dislikecommentresult] = useDislikeComment();
  const [likepost, likepostresult] = useLikePost();
  const [dislikepost, dislikepostresult] = useDislikePost();
  
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  useEffect(() => {
    if (!User) {
      return;
    }

    if (type == "post") {
      var likesid = User.likedposts.map((i) => i.id);
      var dislikesid = User.dislikedposts.map((i) => i.id);
      if (likesid.includes(id)) {
        setLiked(true);
        setDisliked(false);
      }else {
        setLiked(false);
      }
      if (dislikesid.includes(id)) {
        setLiked(false);
        setDisliked(true);
      }else {
        setDisliked(false);
      }
    }
    if (type == "comment") {
      var likesid2 = User.likedcomments.map((i) => i.id);
      var dislikesid2 = User.dislikedcomments.map((i) => i.id);
      if (likesid2.includes(id)) {
        setLiked(true);
        setDisliked(false);
      } else {
        setLiked(false);
      }
      if (dislikesid2.includes(id)) {
        setLiked(false);
        setDisliked(true);
      } else {
        setDisliked(false);
      }
    }
  }, [User, type, id]);

  const handleDislikeComment = async ({ id }) => {
    console.log("dislike comment");
    const data = await dislikecomment({ id: id });
    console.log(data);
  };
  const handleLikeComment = async ({ id }) => {
    console.log("like comment");
    const data = await likecomment({ id: id });
    console.log(data);
  };
  const handleLikePost = async () => {
    const data = await likepost({ id: id });
    console.log(data);
  };
  const handleDislikePost = async () => {
    const data = await dislikepost({ id: id });
    console.log(data);
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

  

  const LikeButton = ({
    handleLikePost,
    handleLikeComment,
    id,
    likeActive,
  }) => {
    if (likeActive) {
      return (
        <IconButton
          onClick={() => {
            if (type == "post") {
              handleLikePost({ id });
            } else {
              handleLikeComment({ id });
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
          } else {
            handleLikeComment({ id });
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
    dislikeActive,
  }) => {
    
    if (dislikeActive) {
      return (
        <IconButton
          className={"button"}
          onClick={() => {
            if (type == "post") {
              handleDislikePost({ id });
            } else {
              handleDislikeComment({ id });
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
          } else {
            handleDislikeComment({ id });
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
        <a style={{ paddingTop: 0, textAlignVertical: "top" }}>{formatNumber(karma)}</a>
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
