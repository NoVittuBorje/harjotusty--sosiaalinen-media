import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import FeedIcon from "@mui/icons-material/Feed";
import useGetManyFeeds from "./hooks/useGetManyFeeds";
import { ApolloClient, useApolloClient } from "@apollo/client";
import useGetSearch from "./hooks/useGetSearch";
import { useDebouncedCallback } from "use-debounce";
import {
  Autocomplete,
  Chip,
  Paper,
  Popper,
  Stack,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const styles = {
  floatingSearchLabelStyle: {
    color: "#fff",
    fontFamily: 'Open Sans","Helvetica Neue",Helvetica,Arial,"Lucida Grande',
  },
  inputSearchStyleText: {
    color: "#fff",
  },
  underlineSearchStyle: {
    borderColor: "#fff",
  },
  hintSearchStyle: {
    color: "#fff",
  },
};
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledAutocomplete = styled(Autocomplete)(({theme}) => ({
    color: "inherit",
  "& .MuiAutocomplete-inputRoot": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "25ch",
    },
  },
}))


export default function PrimarySearchAppBar({ User, refetch }) {
  console.log(User);
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const [search, setSearch] = React.useState(null);
  const [searchvalue, setSearchvalue] = React.useState("");
  const [searchOptions, setSearchoptions] = React.useState("");
  const token = localStorage.getItem("token");
  const feeds = useGetManyFeeds();
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginanchorEl, setLoginAnchorEl] = React.useState(null);
  const [searchanchorEl, setSearchAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isLoginMenuOpen = Boolean(loginanchorEl);
  const isSearchPopperOpen = Boolean(searchanchorEl);

  const menuId = "primary-search-account-menu";
  const loginMenuId = "login-menu";

  const searchopen = Boolean(searchanchorEl);
  const searchmenuId = searchopen ? "search-popper" : undefined;

  console.log(search);
  const { data, loading, error, fetchmore } = useGetSearch({ search });

  const handleLoginMenuOpen = (event) => {
    setLoginAnchorEl(event.currentTarget);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSearchOpen = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleLoginMenuClose = () => {
    setLoginAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSearchClose = () => {
    setSearchAnchorEl(null);
  };

  const handleProfileMenuClick = () => {
    console.log("profile Page");
    navigate(`/profile/${User.id}`);
    handleMenuClose();
  };
  const handleMyaccountClick = () => {
    console.log("my acc page");
    navigate("/myaccount");
    handleMenuClose();
  };
  const handleLoginClick = () => {
    console.log("login page");
    navigate("/login");
    handleLoginMenuClose();
  };
  const handleLogoutClick = () => {
    console.log("logout");
    handleMenuClose();
    apolloClient.clearStore();
    localStorage.clear();
    navigate("/");
  };
  const handleRegisterClick = () => {
    console.log("register page");
    navigate("/register");
    handleLoginMenuClose();
  };
  const handleHomeClick = () => {
    console.log("home");
    navigate("/");
  };
  const handleMakeNewFeedClick = () => {
    console.log("makenewfeed");
    navigate("/makefeed");
  };
  const debounced = useDebouncedCallback((value) => {
    setSearch(value);
  }, 1000);

  const SearchStatePopper = ({ items }) => {
    const searchitems = items ? items.getsearchbar : [];
    console.log(isSearchPopperOpen);
    console.log(searchitems);
    return (
      <Popper
        style={{ width: "100%" }}
        anchorEl={searchanchorEl}
        id={searchmenuId}
        open={isSearchPopperOpen}
        onClose={handleSearchClose}
      >
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          <Typography>juu</Typography>
          {searchitems.map((item) => {
            <Typography>{item.feedname}</Typography>;
          })}
        </Box>
      </Popper>
    );
  };
  const MenuStatelogin = ({ User }) => {
    if (User) {
      return (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileMenuClick}>Profile</MenuItem>
          <MenuItem onClick={handleMyaccountClick}>My account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      );
    } else {
      return (
        <Menu
          anchorEl={loginanchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          id={loginMenuId}
          keepMounted
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={isLoginMenuOpen}
          onClose={handleLoginMenuClose}
        >
          <MenuItem onClick={handleLoginClick}>Login</MenuItem>
          <MenuItem onClick={handleRegisterClick}>Register</MenuItem>
        </Menu>
      );
    }
  };

  const DrawerState = ({ User }) => {
    const popularfeeds = feeds.data ? feeds.data.getfeed : [];
    console.log(popularfeeds, feeds.loading);
    if (feeds.loading) {
      return <Box>loading...</Box>;
    }
    if (User) {
      return (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem key="makefeed" disablePadding>
              <ListItemButton onClick={handleMakeNewFeedClick}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={"Make new feed"} />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem key="ownedfeeds" disablePadding>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Owned feeds"} />
            </ListItem>

            {User.ownedfeeds.map((feed) => (
              <ListItem key={feed.feedname} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/feed/${feed.feedname}`);
                  }}
                >
                  <ListItemText primary={feed.feedname} />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider />
            <ListItem key="subscribedfeeds" disablePadding>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Subscribed feeds"} />
            </ListItem>
            {User.feedsubs
              ? User.feedsubs.map((subs) => (
                  <ListItem key={subs.feedname} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/feed/${subs.feedname}`);
                      }}
                    >
                      <ListItemText primary={subs.feedname} />
                    </ListItemButton>
                  </ListItem>
                ))
              : null}
            <Divider></Divider>
            <ListItem key="popularfeeds" disablePadding>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Popular feeds"} />
            </ListItem>

            {feeds.data.getfeed.map((feed) => (
              <ListItem key={feed.feedname} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/feed/${feed.feedname}`);
                  }}
                >
                  <ListItemText primary={feed.feedname} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider></Divider>
          </List>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem key="popularfeeds" disablePadding>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Popular feeds"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {popularfeeds.map((feed) => (
              <ListItem key={feed.feedname} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/feed/${feed.feedname}`);
                  }}
                >
                  <ListItemText primary={feed.feedname} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    }
  };
  const MenuState = MenuStatelogin({ User });
  const DrawerList = DrawerState({ User });

  const Renderloginstate = ({ User }) => {
    if (!User) {
      return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="login"
            aria-controls={loginMenuId}
            aria-haspopup="true"
            onClick={handleLoginMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      );
    } else {
      return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      );
    }
  };
  const searchoptions = data ? data.getsearchbar : [];

  console.log(searchoptions, "options");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Home button"
            sx={{ mr: 2 }}
            onClick={handleHomeClick}
          >
            <HomeIcon />
          </IconButton>

          <StyledAutocomplete
            disablePortal
            options={searchoptions}
            getOptionLabel={(option) => `f/${option.feedname}`}
            getOptionKey={(option) => option.feedname}
            groupBy={(option) => option.__typename}
            freeSolo
            filterOptions={(x) => x}
            size="small"
            renderOption={(option) => (
              <li key={option.key}>
                <Button
                  sx={{ width: "100%", textAlign: "left", textAnchor: "left" }}
                  onClick={(event) => {
                    console.log(event)
                    navigate(`/feed/${option.key}`);
                  }}
                >
                  <Typography
                    textAlign={"left"}
                    sx={{ textAlign: "left", width: "100%" }}
                  >
                    {option.key}
                  </Typography>
                </Button>
              </li>
            )}
            renderInput={(params) => {
              console.log(params)
              return (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon></SearchIcon>
                  </SearchIconWrapper>

                  <TextField
                    aria-label="search"
                    variant="filled"
                    {...params}
                    onChange={(e) => {
                      debounced(e.target.value);
                      if (e.target.value == "") {
                        setSearchvalue(null);
                      } else {
                        setSearchvalue(e.target.value);
                      }
                    }}
                  />
                </Search>
              );
            }}
            onChange={(value) => {
              console.log(value);
            }}
            onClick={(value) => {
              console.log(value.target.value);
            }}
            renderValue={(value, getItemProps) => (
              <Chip label={value.feedname} {...getItemProps()} />
            )}
          />

          <Box sx={{ flexGrow: 1 }} />
          {Renderloginstate({ User, refetch, token })}
        </Toolbar>
      </AppBar>
      {MenuState}
    </Box>
  );
}
