import { Box, Button, FormGroup, TextField } from '@mui/material';
import React,{useState} from 'react';

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  return (
        <FormGroup sx={{}}>
          <TextField 
            required
            value={content}
            multiline
            label="new comment"
            color="primary"
          sx={{
            input: {
              color: "white",
            }
          }}
            variant="standard" 
            onChange={(event) => setContent(event.target.value)}
            />
        <Box sx={{display:"flex",paddingTop:1}}>
        <Button size='small' variant="outlined" color=""  onClick={() => {onSubmit({content:content})}}  >send</Button>
        </Box>
        </FormGroup>
  );
};

export default CommentForm;