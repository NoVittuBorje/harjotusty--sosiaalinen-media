import { Box, IconButton, Tooltip } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { useNavigate } from "react-router";
import { useState } from "react";

const ArrowcolorDislike = ({ setDownArrow, downArrow, id, dislikes }) => {
  if (downArrow) {
    setDownArrow(false);
  }
  dislikes.map((item) => {
    if (item.id == id) {
      setDownArrow(true);
    }
  });
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
const ArrowcolorLike = ({ upArrow, setUpArrow, id, likes }) => {
  if (upArrow) {
    setUpArrow(false);
  }
  likes.map((item) => {
    if (item.id == id) {
      setUpArrow(true);
    }
  });
  if (upArrow) {
    return (
      <ArrowUpwardRoundedIcon
        style={{ color: "green" }}
      ></ArrowUpwardRoundedIcon>
    );
  } else {
    return (
      <ArrowUpwardRoundedIcon
        style={{ color: "grey" }}
      ></ArrowUpwardRoundedIcon>
    );
  }
};
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
  console.log(karma)
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
        <IconButton
          className={"button"}
          onClick={() => handleLike({ id })}
          size="small"
        >
          <ArrowcolorLike
            User={User}
            likes={likes ? likes : []}
            id={id}
            upArrow={upArrow}
            setUpArrow={setUpArrow}
          ></ArrowcolorLike>
        </IconButton>
      </Tooltip>
      <Tooltip title="karma">
        <a style={{ paddingTop: 0, textAlignVertical: "top" }}>{karma}</a>
      </Tooltip>
      <Tooltip title="Dislike">
        <IconButton
          className={"button"}
          onClick={() => handleDislike({ id })}
          size="small"
        >
          <ArrowcolorDislike
            User={User}
            dislikes={dislikes ? dislikes : []}
            id={id}
            downArrow={downArrow}
            setDownArrow={setDownArrow}
          ></ArrowcolorDislike>
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default KarmaItem;
