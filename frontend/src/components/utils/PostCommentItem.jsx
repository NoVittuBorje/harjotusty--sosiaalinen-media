import { Box, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import formatNumber from "./FormatNumber";

const PostCommentItem = ({comments}) => {
  return (
    <Box
      sx={{ backgroundColor: "background.button" }}
      className={"footerkarma"}
    >
        <Box sx={{display:"flex",alignItems:"center",minHeight:34,maxHeight:34,paddingX:1}}>
    <ChatIcon  color="inherit" size="small"></ChatIcon>
      <Typography>
        
        {formatNumber(comments)}
      </Typography>
      </Box>
    </Box>
  );
};
export default PostCommentItem;
