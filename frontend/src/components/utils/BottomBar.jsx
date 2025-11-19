import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  MenuList,
  Snackbar,
  Stack,
} from "@mui/material";
import { useState } from "react";
import ExpandIcon from "./ExpandIcon";
import { useNavigate } from "react-router";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Chat from "../chatroom/Chat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const BottomBar = ({ User, setmessage, setseverity }) => {
  const [OpenedChat, setOpenedChat] = useState(null);
  const [MakeChatOpen, setMakeChatOpen] = useState(false);

  const [makechatanchorEl, setMakeChatAnchorEl] = useState(null);
  const [chatsanchorEl, setChatsAnchorEl] = useState(null);

  const isChatsMenuOpen = Boolean(chatsanchorEl);
  const isMakeChatMenuOpen = Boolean(makechatanchorEl);

  const chatsmenuId = "Chats-Menu";
  const chatsmenuChatId = "Chats-Menu-chat";
  const makechatmenuId = "Make-Chat-Menu";

  const menuId = "Bottom-Menu";

  const navigate = useNavigate();

  const handleChatsMenuOpen = (event) => {
    if (isChatsMenuOpen) {
      setChatsAnchorEl(null);
    } else {
      setChatsAnchorEl(event.currentTarget);
    }
  };

  const handleChatsMenuClose = () => {
    setChatsAnchorEl(null);
    setOpenedChat(null);
  };
  const handleMakeChatMenuOpen = () => {
    setMakeChatAnchorEl(chatsanchorEl);
    handleChatsMenuClose()
  };
  const handleMakeChatMenuClose = () => {
    console.log("juu");
    setMakeChatAnchorEl(null);
  };
  console.log(User);
  if (!User) {
    return;
  }
  const MakeChatsMenu = ({ User }) => {
    return (
      <>
        <Menu
          anchorEl={makechatanchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          id={makechatmenuId}
          open={isMakeChatMenuOpen}
          onClose={handleMakeChatMenuClose}
          
          sx={{paddingBottom:0,paddingTop:0,borderRadius:5}}
        >
          <Box>
            <IconButton onClick={() => handleMakeChatMenuClose()} size="small">
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
            <Box sx={{ width: 200, height: 310 }}>
              <Chat
                type={"makechatroom"}
                roomId={null}
                CloseMenu={handleMakeChatMenuClose}
                headline={null}
                User={User}
              ></Chat>
            </Box>
          </Box>
        </Menu>
      </>
    );
  };
  const ChatsMenu = ({ User }) => {
    console.log(User);
    if (!User) {
      return;
    }

    if (OpenedChat) {
      return (
        <Box>
          <Button
            size="small"
            edge="end"
            aria-label="chatsmenu"
            aria-controls={chatsmenuId}
            aria-haspopup="true"
            onClick={() => {
              handleChatsMenuClose();
            }}
            color="inherit"
          >
            Chat Rooms
            <ExpandIcon Open={isChatsMenuOpen}></ExpandIcon>
          </Button>

          <Menu
            anchorEl={chatsanchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            id={chatsmenuChatId}
            open={isChatsMenuOpen}
            onClose={handleChatsMenuClose}
          >
            <Box sx={{ border: "1px solid", padding: 1, borderRadius: 4 }}>
              <IconButton onClick={() => setOpenedChat(null)} size="small">
                <ArrowBackIcon></ArrowBackIcon>
              </IconButton>
              <Box sx={{ width: 600, height: 310 }}>
                <Chat
                  type={"chatroom"}
                  roomId={OpenedChat.id}
                  headline={OpenedChat.name}
                  User={User}
                ></Chat>
              </Box>
            </Box>
          </Menu>
        </Box>
      );
    }

    return (
      <Box>
        <Button
          size="small"
          edge="end"
          aria-label="chatsmenu"
          aria-controls={chatsmenuId}
          aria-haspopup="true"
          onClick={(e) => {
            handleChatsMenuOpen(e);
            console.log("2");
          }}
          color="inherit"
          className="button"
          sx={{ borderRadius: 50 }}
        >
          Chat Rooms
          <ExpandIcon Open={isChatsMenuOpen}></ExpandIcon>
        </Button>
        {MakeChatsMenu({ User })}
        <Menu
          anchorEl={chatsanchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={chatsmenuId}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={isChatsMenuOpen}
          onClose={handleChatsMenuClose}
        >
          <ListItemButton
            onClick={handleMakeChatMenuOpen}
            key="Make-ChatRoom"
            aria-controls={makechatmenuId}
            aria-haspopup="true"
            color="inherit"
          >
            <ListItemIcon color="inherit">
              <SettingsIcon></SettingsIcon>
            </ListItemIcon>
            <ListItemText primary={"Chat options"} />
          </ListItemButton>

          <Divider></Divider>
          <ListSubheader color="inherit">
            <ListItem color="inherit" key="Chats" disablePadding>
              <ListItemIcon color="inherit">
                <ChatIcon></ChatIcon>
              </ListItemIcon>
              <ListItemText primary={"Chats"} />
            </ListItem>
          </ListSubheader>
          <MenuList>
            {User.chatrooms.map((item) => (
              <Box>
                <MenuItem id={item.id} onClick={() => setOpenedChat(item)}>
                  {item.name}
                </MenuItem>
                <Divider></Divider>
              </Box>
            ))}
          </MenuList>
        </Menu>
      </Box>
    );
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          backgroundColor: "background.dark",
          borderRadius: 50,
          border: "1px solid",
        }}
        id={menuId}
        open={true}
      >
        {ChatsMenu({ User })}
      </Snackbar>
    </>
  );
};
export default BottomBar;
