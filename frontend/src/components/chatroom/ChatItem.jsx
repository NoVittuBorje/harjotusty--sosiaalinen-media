import {
  Box,
  Button,
  Collapse,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatMessageData from "./ChatData";
import { useRef } from "react";
import { useEffect } from "react";
import ChatForm from "./ChatForm";
import useSendChatMessage from "../hooks/useSendChatMessage";
import ChatMessageItem from "./ChatMessageItem";
const ChatItem = ({ type, headline,roomId,User }) => {
  const [Open, setOpen] = useState(false);
  var ChatData = ChatMessageData({ roomId: roomId });
  console.log(ChatData)

  
  const containerRef = useRef(null);
  const [sendchat, result] = useSendChatMessage();
  const SendChat = ({ content }) => {
    sendchat({
      content: content,
      roomId: roomId,
    });
  };
  const loadmore = () => {
    ChatData.handleFetchMore({ offset: ChatData.data.getMessages.length });
  };
  const executeScroll = () => containerRef.current.scrollIntoView();
  useEffect(() => {
    executeScroll;
  }, [ChatData.data]);
  console.log(ChatData)
  if (ChatData.loading) {
    return;
  }

  return (
    <Box sx={{width:200,maxWidth:200}}>
      <Stack>
          <Box sx={{ display: "flex", alignContent: "center" }}></Box>
          <Box sx={{ float: "right" }}>
            <Typography>{headline} Chat</Typography>
            <Divider></Divider>
            <div
              id="scrollableDiv"
              style={{
                height: 300,
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              <InfiniteScroll
                dataLength={ChatData.data.getMessages.length}
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  padding: 2,
                }}
                next={loadmore}
                inverse={true}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                {/*Put the scroll bar always on the bottom*/}
                {ChatData.data.getMessages.map((item) => (
                  <Box key={`ChatMessage${item.id}`}>
                    <ChatMessageItem item={item}></ChatMessageItem>
                    <Divider></Divider>
                  </Box>
                ))}
                <div ref={containerRef}> {}</div>
              </InfiniteScroll>
              
            </div>
            <ChatForm User={User} onSubmit={SendChat}></ChatForm>
            <Box>
              
            </Box>
          </Box>
      </Stack>
    </Box>
  );
};
export default ChatItem;
