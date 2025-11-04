import { Box, Button, Typography } from "@mui/material";

const ChatMessageItem = ({ item }) => {
  console.log(item);
  return (
    <Box sx={{border:"1px solid black"}}>
      <Button
        className={"button"}
        style={{ borderRadius: 50 }}
        size="small"
        variant="outlined"
        color="inherit"
      >
        <Typography>u/{item.author.username}</Typography>
      </Button>
      <Typography>{item.content}</Typography>
    </Box>
  );
};
export default ChatMessageItem;
