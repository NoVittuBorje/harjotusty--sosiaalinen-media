import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NewComment from './NewComment';
import { Box } from '@mui/material';
const Comment = ({ comment, onReply,Counter,setCounter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  console.log(comment.depth)
  if (comment.depth < 3){
  return (
    <Box key={comment.id}>
      <h4>{comment.user.username}</h4>
      <p>{comment.content}</p>
      <p>{comment.timestamp}</p>
      <Button size='small' aria-describedby={id} onClick={handleClick}>
        reply
      </Button>
      <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Typography>
        <NewComment onReply={onReply} commentid={comment.id} ></NewComment>
        </Typography>
    </Popover>
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
    return(
      <Button size='small'>show more comments</Button>
    )
  }
};

export default Comment