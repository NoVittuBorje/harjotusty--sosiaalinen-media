import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import {
  Box,
  Button,
  Collapse,
  Drawer,
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
import useFriendsRequestActions from "../hooks/useFriendsRequestActions";
import useChatRoomInviteAction from "../hooks/useChatRoomInviteAction";
import useInviteToChatRoom from "../hooks/useInviteToChatRoom";
import { Divider } from "@mui/material";
import Chat from "../chatroom/Chat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const BottomBar = ({ User, setmessage, setseverity }) => {
  const [friendsaction, friendsactionresult] = useFriendsRequestActions();
  const [chatinviteaction, chatactionresult] = useChatRoomInviteAction();
  const [InviteToChatRoom, chatinviteresult] = useInviteToChatRoom();
  const [OpenChats, setOpenChats] = useState(false);
  const [OpenFriends, setOpenFriends] = useState(false);

  const [chatsanchorEl, setChatsAnchorEl] = useState(null);
  const [friendsanchorEl, setFriendsAnchorEl] = useState(null);

  const isChatsMenuOpen = Boolean(chatsanchorEl);
  const isFriendsMenuOpen = Boolean(friendsanchorEl);

  const chatsmenuId = "Chats-Menu";
  const friendsmenuId = "Friends-Menu";
  const chatsmenuChatId = "Chats-Menu-chat";

  const menuId = "Bottom-Menu";

  const navigate = useNavigate();
  const handleChatsMenuOpen = (event) => {
    setChatsAnchorEl(event.currentTarget);
    setFriendsAnchorEl(null);
  };

  const handleChatsMenuClose = () => {
    setChatsAnchorEl(null);
  };
  const handleFriendsMenuOpen = (event) => {
    setFriendsAnchorEl(event.currentTarget);
    setChatsAnchorEl(null);
  };
  const handleFriendsMenuClose = () => {
    setFriendsAnchorEl(null);
  };
  console.log(User);
  if (!User) {
    return;
  }
  const FriendsMenu = ({ User }) => {
    return (
      <Drawer
        anchor="right"
        id={friendsmenuId}
        keepMounted
        open={isFriendsMenuOpen}
        onClose={handleFriendsMenuClose}
        sx={{ padding: 5 }}
      >
        <MenufriendsState User={User}></MenufriendsState>
      </Drawer>
    );
  };
  const MenufriendsState = ({ User }) => {
    const [open, setOpen] = useState(false);
    const Frienditem = ({ item, User }) => {
      const [Open, setOpen] = useState(false);
      const [OpenChatInvite, setOpenChatInvite] = useState(false);
      return (
        <>
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => setOpen(!Open)}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={item.username} />
              <ListItemIcon>
                <ExpandIcon Open={Open}></ExpandIcon>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Collapse in={Open}>
            <Stack direction={"column"} sx={{ textAlign: "center" }}>
              <Typography>Actions:</Typography>
              <Divider></Divider>
              <Button onClick={() => navigate(`/profile/${item.id}`)}>
                Go to profile
              </Button>
              <Button
                onClick={() => {
                  setOpenChatInvite(!OpenChatInvite);
                }}
              >
                invite to chatroom{" "}
                <ExpandIcon Open={OpenChatInvite}></ExpandIcon>
              </Button>
              <Collapse in={OpenChatInvite}>
                {User.chatrooms ? (
                  User.chatrooms.map((chatitem) => (
                    <Button
                      onClick={() => {
                        try {
                          InviteToChatRoom({
                            roomId: chatitem.id,
                            invitedId: item.id,
                          });
                          setseverity("success");
                          setmessage(
                            `Friend ${item.username} invited to ${chatitem.name}`
                          );
                        } catch (error) {
                          setmessage(error.message);
                          setseverity("error");
                        }
                      }}
                    >
                      {chatitem.name}
                    </Button>
                  ))
                ) : (
                  <Typography>No chatrooms to invite to.</Typography>
                )}
              </Collapse>
              <Button>Remove friend</Button>
            </Stack>
          </Collapse>
        </>
      );
    };
    return (
      <>
        <ListSubheader>
          <ListItem key="friends" disablePadding>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"Friends"} />
          </ListItem>
        </ListSubheader>

        {User.friends ? (
          User.friends.map((item) => (
            <Frienditem item={item} User={User}></Frienditem>
          ))
        ) : (
          <Typography>No friends :/.</Typography>
        )}
      </>
    );
  };
  const ChatsMenu = ({ User }) => {
    console.log(User);
    const [OpenedChat, setOpenedChat] = useState(null);
    if (OpenedChat) {
      return (
        <>
          <Button
            size="small"
            edge="end"
            aria-label="chatsmenu"
            aria-controls={chatsmenuId}
            aria-haspopup="true"
            onClick={handleChatsMenuOpen}
            color="inherit"
          >
            <Typography>
              Chat Rooms
              <IconButton size="small">
                <ExpandIcon Open={isChatsMenuOpen}></ExpandIcon>
              </IconButton>
            </Typography>
          </Button>
          <Menu
            anchorEl={chatsanchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            id={chatsmenuChatId}
            keepMounted
            open={isChatsMenuOpen}
            onClose={handleChatsMenuClose}
            sx={{ height: 500, width: "auto" }}
          >
            <IconButton onClick={() => setOpenedChat(null)} size="small">
              <ArrowBackIcon></ArrowBackIcon>
            </IconButton>
            <Chat
              type={"account"}
              roomId={OpenedChat.id}
              headline={OpenedChat.name}
              User={User}
            ></Chat>
          </Menu>
        </>
      );
    }
    return (
      <>
        <Button
          size="small"
          edge="end"
          aria-label="chatsmenu"
          aria-controls={chatsmenuId}
          aria-haspopup="true"
          onClick={handleChatsMenuOpen}
          color="inherit"
        >
          <Typography>
            Chat Rooms
            <IconButton size="small">
              <ExpandIcon Open={isChatsMenuOpen}></ExpandIcon>
            </IconButton>
          </Typography>
        </Button>
        <Menu
          anchorEl={chatsanchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={chatsmenuId}
          keepMounted
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={isChatsMenuOpen}
          onClose={handleChatsMenuClose}
          sx={{ padding: 5 }}
        >
          <ListSubheader>
            <ListItem key="Chats" disablePadding>
              <ListItemIcon>
                <ChatIcon></ChatIcon>
              </ListItemIcon>
              <ListItemText primary={"Chats"} />
            </ListItem>
          </ListSubheader>
          <MenuList>
            {User.chatrooms.map((item) => (
              <MenuItem id={item.id} onClick={() => setOpenedChat(item)}>
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </>
    );
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={menuId}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={true}
      >
        <Toolbar
          sx={{
            backgroundColor: "black",
            borderRadius: 5,
          }}
        >
          <Box sx={{ display: "block" }}>
            <Stack direction={"row"}>
              <Button
                onClick={handleFriendsMenuOpen}
                size="small"
                edge="end"
                aria-label="friendsmenu"
                aria-controls={friendsmenuId}
                aria-haspopup="true"
                color="inherit"
              >
                <Typography>
                  Friends
                  <IconButton size="small">
                    <MenuIcon></MenuIcon>
                  </IconButton>
                </Typography>
              </Button>
            </Stack>
          </Box>
          {ChatsMenu({ User })}
          {FriendsMenu({ User })}
        </Toolbar>
      </Snackbar>
    </>
  );
};
export default BottomBar;
