import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const EditFieldItem = ({ valueType, value, handleSave }) => {
  const [open, setOpen] = useState(false);
  const [fieldvalue, setValue] = useState(value);
  const EditState = () => {
    if (open) {
      return (
        <Stack>
          <TextField
            color="primary"
            sx={{ m: 1 }}
            inputProps={{ style: { color: "white" } }}
            variant="standard"
            InputLabelProps={{ style: { color: "white" } }}
            value={fieldvalue}
            onChange={(event) => setValue(event.target.value)}
            label={valueType}
          ></TextField>
          <Box>
            <Button
              className={"button"}
              style={{ borderRadius: 50 }}
              size="small"
              variant="outlined"
              color=""
              onClick={() =>
                handleSave({ content: fieldvalue, type: valueType })
              }
            >
              save
            </Button>

            <Button
              className={"button"}
              style={{ borderRadius: 50 }}
              size="small"
              variant="outlined"
              color=""
              onClick={() => setOpen(!open)}
            >
              cancel
            </Button>
          </Box>
        </Stack>
      );
    } else {
      return (
        <Box padding={1}>
          <Typography>{`${valueType}: ${value}`} </Typography>
          <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            size="small"
            variant="outlined"
            color=""
            onClick={() => setOpen(!open)}
          >
            edit
          </Button>
        </Box>
      );
    }
  };
  return <Box sx={{ borderTop: 1 }}>{EditState()}</Box>;
};
export default EditFieldItem;
