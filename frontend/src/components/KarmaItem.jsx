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
  const [upArrow, setUpArrow] = useState(false);
  const [downArrow, setDownArrow] = useState(false);
  const ArrowcolorDislike = ({ setDownArrow, downArrow, id, dislikes }) => {
  if (downArrow) {
    setDownArrow(false);
  }
  ;
  if (downArrow) {
    return (
      <ArrowDownwardRoundedIcon
        style={{ color: "red" }}
      ></ArrowDownwardRoundedIcon>
    );
  } else {
    return (
      <ArrowDownwardRoundedIcon
        style={{ color: "grey" }}
      ></ArrowDownwardRoundedIcon>
    );
  }
};
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
  dislikes = dislikes.map(l => l.id)
 
  likes = likes.map(l => l.id)

  return (
    <Box className={"footerkarma"}>
      <Tooltip title="Like">
      <LikeButton handleDislike={handleDislike} id={id} handleLike={handleLike} likeActive={likes.includes(id)}></LikeButton>
      </Tooltip>
      <Tooltip title="karma">
        <a style={{ paddingTop: 0, textAlignVertical: "top" }}>{karma}</a>
      </Tooltip>
      <Tooltip title="Dislike">
      <DislikeButton handleDislike={handleDislike} id={id} handleLike={handleLike} likeActive={dislikes.includes(id)}></DislikeButton>
      </Tooltip>
    </Box>
  );
};
export default KarmaItem;
