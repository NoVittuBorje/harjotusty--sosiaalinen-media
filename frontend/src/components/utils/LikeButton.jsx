import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
const LikeButton = ({
  handleLike,
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
          handleLike({ id });
          handleClick();
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
        handleLike({ id });
        handleClick();
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

export default LikeButton;
