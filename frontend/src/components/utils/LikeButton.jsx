import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
const LikeButton = ({handleLike,handleDislike,id,likeActive}) => {

    const [liked,setLiked] = useState(likeActive)
    const handleClick = () => {
        setLiked(!liked)
    }

    if (liked){
        return (
                <IconButton
                  className={"button"}
                  onClick={() => {handleDislike({ id });handleClick()}}
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