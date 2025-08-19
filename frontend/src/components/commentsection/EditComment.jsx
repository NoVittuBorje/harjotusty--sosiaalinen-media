import { FormGroup, TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const EditComment = ({ onReply, commentid, oldcomment, handleEditClick }) => {
  const [comment, setComment] = useState(oldcomment);
  return (
    <FormGroup>
      <TextField
        required
        value={comment}
        multiline
        inputProps={{ style: { color: "white" } }}
        variant="standard"
        onChange={(event) => setComment(event.target.value)}
      />
      <Box sx={{ display: "flex", paddingTop: 1 }}>
        <Button
          size="small"
          variant="standard"
          color=""
          className={"button"}
          style={{ borderRadius: 50 }}
          onClick={() => {
            onReply({ content: comment, commentid, action: "edit" });
            handleEditClick();
          }}
        >
          edit
        </Button>
        <Button
          size="small"
          variant="standard"
          color=""
          className={"button"}
          style={{ borderRadius: 50 }}
          onClick={handleEditClick}
        >
          cancel
        </Button>
      </Box>
    </FormGroup>
  );
};
export default EditComment;
