import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
const DislikeButton = ({handleLike,handleDislike,id,likeActive}) => {

    const [liked,setLiked] = useState(likeActive)
    const handleClick = () => {
        setLiked(!liked)
    }

    if (liked){
        return (
                <IconButton
                  className={"button"}
                  onClick={() => {handleLike({ id });handleClick()}}
                  size="small"
                ><ArrowDownwardRoundedIcon
        style={{ color: "red" }}
      ></ArrowDownwardRoundedIcon></IconButton>)
    }
    return(
        <IconButton
          className={"button"}
          onClick={() => {handleDislike({ id });handleClick()}}
          size="small"
        >
        <ArrowDownwardRoundedIcon
        style={{ color: "grey" }}
      ></ArrowDownwardRoundedIcon>
      </IconButton>
    )
}

export default DislikeButton