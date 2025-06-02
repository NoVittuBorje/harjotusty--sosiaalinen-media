import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NewComment from './NewComment';
import { Box, Collapse } from '@mui/material';
const Comment = ({ comment, onReply,Counter,setCounter }) => {

  const [open, setOpen] = React.useState(false);
  const [ShowComments,setShowComments] = React.useState(false)
  const handleReplyClick = () => {
    setOpen(!open);
  };
  const handleMoreComments = () => {
    setShowComments(true)
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
        <Button size='small'  onClick={handleReplyClick}>
          reply
        </Button>
        )
      }
  }

  console.log(ShowComments)
  if (comment.depth < 2 || ShowComments){
    if (!comment.user){
      console.log(comment)
      
    }
  console.log(comment.content,"depth" ,comment.depth)
  return (
    <Box key={comment.id} sx={{color:'white'}}>
      <h4>{comment.user.username}</h4>
      <p>{comment.content}</p>
      <p>{comment.timestamp}</p>
        {ReplySection()}
    
      {comment.replies.length > 0 && (
        <ul>
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment comment={reply} onReply={onReply} setCounter={setCounter} Counter={Counter}/>
            </li>
          ))}
        </ul>
      )}

    </Box>
  )}else{
    console.log(comment)
    return(
      <Button size='small' onClick={handleMoreComments}>show more comments</Button>
    )
  }
};

export default Comment