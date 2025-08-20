import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const EditFieldItem = ({ setField, valueType, value }) => {
  const [open, setOpen] = useState(false);
  const EditState = () => {
    if (open) {
      return (
        <Stack>
          <TextField
            color="primary"
            inputProps={{ style: { color: "white" } }}
            variant="standard"
            InputLabelProps={{ style: { color: "white" } }}
            value={value}
            label={valueType}
          ></TextField>
          <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            size="small"
            variant="standard"
            color=""
          >
            edit
          </Button>

          <Button             className={"button"}
            style={{ borderRadius: 50 }}
            size="small"
            variant="standard"
            color="" onClick={() => setOpen(!open)}>cancel</Button>
        </Stack>
      );
    } else {
      return (
        <Box>
          <Typography>{`${valueType}: ${value}`} </Typography>
          <Button             className={"button"}
            style={{ borderRadius: 50 }}
            size="small"
            variant="standard"
            color="" onClick={() => setOpen(!open)}>edit</Button>
        </Box>
      );
    }
  };
  return <Box sx={{ borderTop: 1 }}>{EditState()}</Box>;
};
export default EditFieldItem;
