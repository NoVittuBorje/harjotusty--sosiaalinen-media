import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
const DislikeButton = ({
  handleDislike,
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
          handleDislike({ id });
          handleClick();
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
        handleDislike({ id });
        handleClick();
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

export default DislikeButton;
