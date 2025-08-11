import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
const LikeButton = ({handleLike,id,likeActive,dislikeActive,setLiked,setDisliked}) => {
    const handleClick = () => {
        setLiked(!likeActive)
        if(dislikeActive){
          setDisliked(!dislikeActive)
        }
    }

    if (likeActive){
        return (
                <IconButton
                  className={"button"}
                  onClick={() => {handleLike({ id });handleClick()}}
                  size="small"
                ><ArrowUpwardRoundedIcon
        style={{ color: "green" }}
      ></ArrowUpwardRoundedIcon></IconButton>)
    }
    return(
        <IconButton
          className={"button"}
          onClick={() => {handleLike({ id });handleClick()}}
          size="small"
        >
        <ArrowUpwardRoundedIcon
        style={{ color: "grey" }}
      ></ArrowUpwardRoundedIcon>
      </IconButton>
    )
}

export default LikeButton