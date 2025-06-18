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
            onReply({ content: comment, commentid, action: "modify" });
            handleEditClick();
          }}
        >
          edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color=""
          onClick={handleEditClick}
        >
          cancel
        </Button>
      </Box>
    </FormGroup>
  );
};
export default EditComment;
