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
const ChatItem = ({ type, headline }) => {
  const [Open, setOpen] = useState(false);
  const ChatData = ChatMessageData({ roomId: "6908b05aa6df56041422274a" });
  console.log(ChatData);

  const containerRef = useRef(null);
  const [sendchat, result] = useSendChatMessage();
  const SendChat = ({ content }) => {
    sendchat({
      content: content,
      roomId: "6908b05aa6df56041422274a",
    });
  };
  const executeScroll = () => containerRef.current.scrollIntoView();
  useEffect(() => {
    executeScroll;
  }, [ChatData.data]);

  if (ChatData.loading) {
    return;
  }
  return (
    <Box>
      <Stack>
        <Button
          className={"button"}
          style={{ borderRadius: 50 }}
          size="small"
          variant="outlined"
          color="inherit"
          onClick={() => setOpen(!Open)}
        >
          Open {headline} Chat
        </Button>
        <Collapse in={Open}>
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
                  flexDirection: "column",
                  border: "1px solid white",
                  padding: 2,
                }}
                inverse={true}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDiv"
              >
                {/*Put the scroll bar always on the bottom*/}
                {ChatData.data.getMessages.map((item) => (
                  <Box key={`ChatMessage${item.id}`}>
                    <ChatMessageItem item={item}></ChatMessageItem>
                  </Box>
                ))}
                <div ref={containerRef}> {}</div>
              </InfiniteScroll>
            </div>
            <Box>
              <ChatForm onSubmit={SendChat}></ChatForm>
            </Box>
          </Box>
        </Collapse>
      </Stack>
    </Box>
  );
};
export default ChatItem;
