import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NewComment from './NewComment';
import { Avatar, Box, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
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

const Comment = ({ comment, onReply,Counter,setCounter,User ,handleDelete, handleModify}) => {
  const [open, setOpen] = React.useState(false);
  const [ShowComments,setShowComments] = React.useState(false)
  const handleReplyClick = () => {
    setOpen(!open);
  };
  const handleMoreComments = () => {
    setShowComments(true)
  }
  const DeleteCommentButton = () => {
    if(comment.user.username === User.username){
      return(
        <>
      <Button onClick={() => {handleDelete(comment)}} size='small' variant="outlined" color=''>delete</Button>
      <Button onClick={() => {handleModify(comment)}} size='small' variant="outlined" color=''>edit</Button>
      </>
    )
    }
  }
  const ReplySection = () => {
    if (open){
      return (
        <Collapse in={open} timeout={"auto"} unmountOnExit >
          <Box>
        <NewComment onReply={onReply} commentid={comment.id} handleReplyClick={handleReplyClick} ></NewComment>
        </Box>
        </Collapse>
      )
    }else{
        return (
        <Box>
        <Button size='small' variant="outlined" color='' onClick={handleReplyClick}>reply</Button>
        <DeleteCommentButton></DeleteCommentButton>
        </Box>
        )
      }
  }

  console.log(ShowComments)
  if (comment.depth < 2 || ShowComments){
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
      <Typography style={{wordWrap: "break-word",}} gutterBottom >{comment.content}</Typography>
      </Box>

        <Box className={"feedfooter"}>
          <Box className={"feedfooterkarma"} >
                <IconButton  size="small">
                    <ArrowUpwardRoundedIcon style={{color:"green"}}></ArrowUpwardRoundedIcon>
                </IconButton>

                <Box>
                    <a style={{paddingTop:0,textAlignVertical:"top"}}>{comment.karma}</a>
                </Box>

                <IconButton  size="small">
                    <ArrowDownwardRoundedIcon style={{color:"red"}}></ArrowDownwardRoundedIcon>
                </IconButton>
                </Box>
                {ReplySection()}
            </Box>
        

        
      {comment.replies.length > 0 && (
        <List>
          {comment.replies.map((reply) => (
            <ListItem key={reply.id}>
              <Comment comment={reply} User={User} onReply={onReply} setCounter={setCounter} Counter={Counter} handleDelete={handleDelete} handleModify={handleModify}/>
            </ListItem>
          ))}
        </List>
      )}

    </Box>
  )}else{
    console.log(comment)
    return(
      <Button size='small' variant="outlined" color='' onClick={handleMoreComments}>show more replies</Button>
    )
  }
};

export default Comment