import { useState } from "react";
import ChatItem from "./ChatItem"
import { Box, Button, Icon } from "@mui/material";
import ExpandIcon from "../utils/ExpandIcon";
import ForumIcon from '@mui/icons-material/Forum';
import ChatOptions from "./ChatOptions";
const Chat = ({type,roomId,headline,User,CloseMenu}) => {
  const [Open, setOpen] = useState(false)
    if(type == "feed"){
    if(Open){
    return(
      <Box sx={{border:"1px solid",borderRadius:5,padding:1,display:"flex",flexDirection:"column",width:"60%"}}>
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
        <ChatItem type={type} roomId={roomId} headline={headline} User={User} size={{width:"auto",maxWidth:"auto",height:200}}></ChatItem>
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
    }}
    if(type == "chatroom"){
      return(
        <Box >
                <ChatItem type={type} roomId={roomId} headline={headline} User={User} size={{width:"auto",maxWidth:"auto",height:200}}></ChatItem>
                </Box>
      )
    }
    if(type == "makechatroom"){
      return(
        <Box sx={{width:"auto",height:"auto",borderRadius:5}}>
          <ChatOptions User={User} CloseMenu={CloseMenu}></ChatOptions>
        </Box>
      )
    }
}
export default Chat
