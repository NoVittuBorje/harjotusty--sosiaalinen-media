import { Box, IconButton, Tooltip } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { useNavigate } from "react-router";
import { useState } from "react";
import LikeButton from "./utils/LikeButton";
import DislikeButton from "./utils/DislikeButton";

const KarmaItem = ({
  handleDislike,
  handleLike,
  id,
  karma,
  User,
  likes,
  dislikes,
}) => {
  const navigate = useNavigate();
  
  dislikes = dislikes.map((l) => l.id);
  likes = likes.map((l) => l.id);
  console.log(likes,dislikes,id)
  const [liked, setLiked] = useState(likes.includes(id));
  const [disliked, setDisliked] = useState(dislikes.includes(id));
  console.log(likes.includes(id))
  if (!User) {
    return (
      <Box className={"footerkarma"}>
        <Tooltip title="Login to like">
          <IconButton
            className={"button"}
            onClick={() => navigate("/login")}
            size="small"
          >
            <ArrowUpwardRoundedIcon
              style={{ color: "green" }}
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
              style={{ color: "red" }}
            ></ArrowDownwardRoundedIcon>
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box className={"footerkarma"}>
      <Tooltip title="Like">
        <LikeButton
          id={id}
          handleLike={handleLike}
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
          handleDislike={handleDislike}
          id={id}
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
