import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NewComment from './NewComment';
const Comment = ({ comment, onReply }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  console.log(comment)
  return (
    <div key={comment.id}>
      <h4>{comment.user.username}</h4>
      <p>{comment.content}</p>
      <p>{comment.timestamp}</p>
      {comment.replies.length > 0 && (
        <ul>
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment comment={reply} onReply={onReply} />
            </li>
          ))}
        </ul>
      )}
      <Button aria-describedby={id} onClick={handleClick}>
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
      <Typography sx={{ p: 2 }}>
        <NewComment ></NewComment>
        </Typography>
    </Popover>
    </div>
  )
};

export default Comment