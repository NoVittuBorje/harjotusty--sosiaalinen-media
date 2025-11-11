import { useState } from "react";
import ChatItem from "./Chatitem"
import { Box, Button, Icon } from "@mui/material";
import ExpandIcon from "../utils/ExpandIcon";
import ForumIcon from '@mui/icons-material/Forum';
const Chat = ({type,roomId,headline,User}) => {
    const [Open, setOpen] = useState(false)
    if(Open){
    return(
      <Box sx={{width:200}}>
              <Button
          className={"button"}
          style={{ borderRadius: 50 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => setOpen(!Open)}
        >
          <ForumIcon></ForumIcon>Close {headline} Chat <ExpandIcon Open={Open}></ExpandIcon>
        </Button>
        <ChatItem type={type} roomId={roomId} headline={headline} User={User}></ChatItem>
        </Box>
    )}else{
      return(
        <Button
          className={"button"}
          style={{ borderRadius: 50 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => setOpen(!Open)}
        >
          <ForumIcon></ForumIcon>Open {headline} Chat <ExpandIcon Open={Open}></ExpandIcon>
        </Button>

      )
    }
}
export default Chat