import { FormGroup, TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const NewComment = ({ onReply, commentid, handleReplyClick }) => {
  const [comment, setComment] = useState("");
  return (
    <FormGroup>
      <TextField
        required
        value={comment}
        multiline
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        slotProps={{ style: { color: "white" } }}
        variant="standard"
        onChange={(event) => setComment(event.target.value)}
      />
      <Box sx={{ display: "flex", paddingTop: 1 }}>
        <Button
          size="small"
          variant="outlined"
          color=""
          onClick={() => {
            onReply({ content: comment, commentid });
          }}
        >
          reply
        </Button>
        <Button
          size="small"
          variant="outlined"
          color=""
          onClick={handleReplyClick}
        >
          cancel
        </Button>
      </Box>
    </FormGroup>
  );
};
export default NewComment;
