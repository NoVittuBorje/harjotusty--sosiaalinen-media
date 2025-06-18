import { Box, IconButton, Tooltip } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { useNavigate } from "react-router";

const KarmaItem = ({ handleDislike, handleLike,id, karma, User,}) => {
  const navigate = useNavigate();
  const Users = User;
  console.log(Users.likedcomments)

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
          <IconButton className={"button"} onClick={() => navigate("/login")} size="small">
            <ArrowDownwardRoundedIcon
              style={{ color: "red" }}
            ></ArrowDownwardRoundedIcon>
          </IconButton>
        </Tooltip>
      </Box>
    );
  }
  const disliketrue = User.dislikedcomments.map(comment =>comment.id.includes(id))
  const liketrue = User.likedcomments.map(comment =>comment.id.includes(id))
  const ArrowcolorDislike = () => {
    if(disliketrue[0]){
      console.log(disliketrue,"disliketrue")
      console.log(User.dislikedcomments)
    return(
      <ArrowDownwardRoundedIcon
            style={{ color: "red" }}
      ></ArrowDownwardRoundedIcon>
    )
    }else{
      return(
      <ArrowDownwardRoundedIcon
            style={{ color: "grey" }}
      ></ArrowDownwardRoundedIcon>
      )
    }
  }
  const ArrowcolorLike = () => {
    if(liketrue[0]){
      console.log(liketrue,"liketrue")
      console.log(User.likedcomments)
    return(
      <ArrowUpwardRoundedIcon
            style={{ color: "green" }}
      ></ArrowUpwardRoundedIcon>
    )
    }else{
      return(
      <ArrowUpwardRoundedIcon
            style={{ color: "grey" }}
      ></ArrowUpwardRoundedIcon>
      )
    }
  }
  
  return (
    <Box className={"footerkarma"}>
      <Tooltip title="Like">
        <IconButton className={"button"} onClick={() => handleLike({id})} size="small">
          <ArrowcolorLike></ArrowcolorLike>
        </IconButton>
      </Tooltip>
      <Tooltip title="karma">
        <a style={{ paddingTop: 0, textAlignVertical: "top" }}>{karma}</a>
      </Tooltip>
      <Tooltip title="Dislike">
        <IconButton className={"button"} onClick={() => handleDislike({id})} size="small">
          <ArrowcolorDislike></ArrowcolorDislike>
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default KarmaItem;
