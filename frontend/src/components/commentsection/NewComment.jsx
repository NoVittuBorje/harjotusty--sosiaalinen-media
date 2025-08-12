import { FormGroup, TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const NewComment = ({
  handleReply,
  commentid,
  handleReplyClick,
  refetchComment,
}) => {
  const [comment, setComment] = useState("");
  const handleNewReply = (event) => {
    event.preventDefault();
    handleReply({
      content: comment,
      commentid,
      refetchComment: refetchComment,
    });
  };
  return (
    <FormGroup>
      <TextField
        required
        value={comment}
        multiline
        variant="standard"
        inputProps={{ style: { color: "white" } }}
        onChange={(event) => setComment(event.target.value)}
      />
      <Box sx={{ display: "flex", paddingTop: 1 }}>
        <Button
          size="small"
          variant="standard"
          className={"button"}
          style={{ borderRadius: 50 }}
          onClick={(event) => {
            handleNewReply(event);
          }}
        >
          reply
        </Button>
        <Button
          size="small"
          variant="standard"
          className={"button"}
          style={{ borderRadius: 50 }}
          onClick={handleReplyClick}
        >
          cancel
        </Button>
      </Box>
    </FormGroup>
  );
};
export default NewComment;
