import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NewComment from './NewComment';
import { Avatar, Box, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import MoreComments from './MoreComments';
import useMakeComment from '../hooks/useMakeComment';
import KarmaItem from '../KarmaItem';
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

const Comment = ({ comment, handleDelete,User, handleModify,handleReply,postid }) => {
  console.log(comment,"1")
  const [open, setOpen] = React.useState(false);
  const [ShowComments,setShowComments] = React.useState(false)
  const handleReplyClick = () => {
    setOpen(!open);
  };
  const handleMoreComments = () => {
    setShowComments(true)
  }
  const handleDislike = () => {
    console.log("dislike comment")
  }
  const handleLike = () => {
    console.log("like comment")
  }
  const Showmorecomments = () => {
    if (comment.replies.length == 0){
      return
    }
    if (ShowComments == false){
    return(<Button size='small' variant="outlined" color='' onClick={handleMoreComments}>show {comment.replies.length} replies</Button>)
    }else{
      return(
      <MoreComments comment={comment} ShowComments={ShowComments} User={User} postid={postid} ></MoreComments>
    )}
  }

  const ReplySection = () => {
    if (open){
      return (
        <Collapse in={open} timeout={"auto"} unmountOnExit >
        <NewComment onReply={handleReply} commentid={comment.id} handleReplyClick={handleReplyClick} ></NewComment>
        </Collapse>
      )
    }else{
        return (
        <Box >
        <Button className={'button'} style={{ borderRadius: 50 }} size='small' variant="standard" color='' onClick={handleReplyClick}>reply</Button>
        <Button className={'button'} style={{ borderRadius: 50 }} onClick={() => {handleDelete(comment)}} size='small' variant="standard" color=''>delete</Button>
        <Button className={'button'} style={{ borderRadius: 50 }} onClick={() => {handleModify(comment)}} size='small' variant="standard" color=''>edit</Button>
        </Box>
        )
      }
  }
  console.log(ShowComments)
  if (comment.content || ShowComments){
  console.log(comment.content,"depth" ,comment.depth)
  return (
    <Box key={comment.id} sx={{color:'white',border:"2px black solid",borderRadius:"15px", padding:0.5,minWidth:"100%" , maxWidth:"100%",}}>
      <Box sx={{display:'flex',flexDirection:"row", alignItems:"center"}}>
      <ListItemAvatar>
        <Avatar sx={{ width: 24, height: 24 }} {...stringAvatar(comment.user.username)}></Avatar>
      </ListItemAvatar>
      <Typography variant='h8'>{comment.user.username}</Typography>
      <Typography>{comment.timestamp}</Typography>
      </Box>
      <Box sx={{paddingLeft:2 ,maxWidth:"100%",whiteSpace:"pre-wrap"}}>
      <Typography style={{wordWrap: "break-word",}} >{comment.content}</Typography>
      </Box>
        <Box className={"footer"}>
            <KarmaItem handleDislike={handleDislike} handleLike={handleLike} karma={comment.karma}></KarmaItem>
            </Box>
            {ReplySection()}
            <Showmorecomments></Showmorecomments>

    </Box>
  )}else{
    return(<></>)
  }
};

export default Comment

