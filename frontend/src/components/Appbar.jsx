import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FeedIcon from "@mui/icons-material/Feed";
import useGetManyFeeds from "./hooks/useGetManyFeeds";
import { useApolloClient } from "@apollo/client";
import useGetSearch from "./hooks/useGetSearch";
import { useDebouncedCallback } from "use-debounce";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Popper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  useColorScheme,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  "& .MuiAutocomplete-inputRoot": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: 200,
  },
}));

export default function PrimarySearchAppBar({ User, refetch }) {
  console.log(User);
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const token = sessionStorage.getItem("token");

  const feeds = useGetManyFeeds();

  const [search, setSearch] = useState(null);
  const { data, loading, error, fetchmore } = useGetSearch({ search });

  const [open, setOpen] = useState(false);

  const [searchvalue, setSearchvalue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginanchorEl, setLoginAnchorEl] = useState(null);
  const [searchanchorEl, setSearchAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isLoginMenuOpen = Boolean(loginanchorEl);
  const isSearchPopperOpen = Boolean(searchanchorEl);

  const menuId = "primary-search-account-menu";
  const loginMenuId = "login-menu";

  const searchopen = Boolean(searchanchorEl);
  const searchmenuId = searchopen ? "search-popper" : undefined;

  const handleLoginMenuOpen = (event) => {
    setLoginAnchorEl(event.currentTarget);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
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
    localStorage.setItem("HomeorderBy", "POPULAR");
    localStorage.setItem("FeedorderBy", "POPULAR");
    sessionStorage.clear()
    
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

  const ThemeState = () => {
    const { mode, setMode } = useColorScheme();
    console.log(mode);
    if (!mode) {
      return null;
    }
    return (
      <Box>
        <select
          value={mode}
          onChange={(event) => {
            setMode(event.target.value);
          }}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          
        </select>
      </Box>
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
            vertical: "top",
            horizontal: "left",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileMenuClick}>
            <PersonIcon></PersonIcon>Profile
          </MenuItem>
          <MenuItem onClick={handleMyaccountClick}>
            <AccountBoxIcon></AccountBoxIcon>My account
          </MenuItem>
          <MenuItem onClick={handleLogoutClick}>
            <LogoutIcon></LogoutIcon>Logout
          </MenuItem>
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
            vertical: "top",
            horizontal: "left",
          }}
          open={isLoginMenuOpen}
          onClose={handleLoginMenuClose}
        >
          <MenuItem onClick={handleLoginClick}>
            <LoginIcon></LoginIcon>Login
          </MenuItem>
          <MenuItem onClick={handleRegisterClick}>
            <LoginIcon></LoginIcon>Register
          </MenuItem>
        </Menu>
      );
    }
  };
  const MenupopularState = ({ feeds }) => {
    const [open, setOpen] = useState(false);
    if (open) {
      return (
        <>
          <ListItem key="popularfeeds" disablePadding>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Popular feeds"} />
              <ListItemIcon>
                <ArrowDropUpIcon></ArrowDropUpIcon>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {feeds.data.getfeed.map((feed) => (
            <ListItem
              onClick={toggleDrawer(false)}
              key={feed.feedname}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  navigate(`/feed/${feed.feedname}`);
                }}
              >
                <ListItemText primary={feed.feedname} />
              </ListItemButton>
            </ListItem>
          ))}
        </>
      );
    } else {
      return (
        <ListItem key="popularfeeds" disablePadding>
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary={"Popular feeds"} />
            <ListItemIcon>
              <ArrowDropDownIcon></ArrowDropDownIcon>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      );
    }
  };
  const MenusubsState = ({ User }) => {
    const [open, setOpen] = useState(false);
    if (open) {
      return (
        <>
          <ListItem key="subscribedfeeds" disablePadding>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Subscribed feeds"} />
              <ListItemIcon>
                <ArrowDropUpIcon></ArrowDropUpIcon>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {User.feedsubs
            ? User.feedsubs.map((subs) => (
                <ListItem
                  onClick={toggleDrawer(false)}
                  key={subs.feedname}
                  disablePadding
                >
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
        </>
      );
    } else {
      return (
        <ListItem key="subscribedfeeds" disablePadding>
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary={"Subscribed feeds"} />
            <ListItemIcon>
              <ArrowDropDownIcon></ArrowDropDownIcon>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      );
    }
  };

  const MenuOwnedState = ({ User }) => {
    const [open, setOpen] = useState(false);
    if (open) {
      return (
        <>
          <ListItem key="ownedfeeds" disablePadding>
            <ListItemButton onClick={() => setOpen(!open)}>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Owned feeds"} />
              <ListItemIcon>
                <ArrowDropUpIcon></ArrowDropUpIcon>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {User.ownedfeeds.map((feed) => (
            <ListItem
              onClick={toggleDrawer(false)}
              key={feed.feedname}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  navigate(`/feed/${feed.feedname}`);
                }}
              >
                <ListItemText primary={feed.feedname} />
              </ListItemButton>
            </ListItem>
          ))}
        </>
      );
    } else {
      return (
        <ListItem key="ownedfeeds" disablePadding>
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary={"Owned feeds"} />
            <ListItemIcon>
              <ArrowDropDownIcon></ArrowDropDownIcon>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
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
        <Box sx={{ width: 250 }} role="presentation">
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

            <MenuOwnedState User={User}></MenuOwnedState>

            <Divider />

            <MenusubsState User={User}></MenusubsState>
            <Divider></Divider>

            <MenupopularState feeds={feeds}></MenupopularState>
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
        <Box sx={{ display: { md: "flex" } }}>
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
        <Box sx={{ display: { md: "flex" } }}>
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
            getOptionKey={(option) => option}
            groupBy={(option) => option.__typename}
            freeSolo
            filterOptions={(x) => x}
            size="small"
            renderOption={(option) => {
              if (option.key.__typename == "Feed") {
                return (
                  <li key={option.key.id}>
                    <Button
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        textAnchor: "left",
                      }}
                      onClick={(event) => {
                        console.log(event);
                        navigate(`/feed/${option.key.feedname}`);
                      }}
                    >
                      <Typography
                        textAlign={"left"}
                        sx={{ textAlign: "left", width: "100%" }}
                      >
                        {option.key.feedname}
                      </Typography>
                    </Button>
                  </li>
                );
              }
              if (option.key.__typename == "Post") {
                return (
                  <li key={option.key.id}>
                    <Button
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        textAnchor: "left",
                      }}
                      onClick={(event) => {
                        console.log(event);
                        navigate(`/post/${option.key.id}`);
                      }}
                    >
                      <Typography
                        textAlign={"left"}
                        sx={{ textAlign: "left", width: "100%" }}
                      >
                        {option.key.headline}
                      </Typography>
                    </Button>
                  </li>
                );
              }
              if (option.key.__typename == "User") {
                return (
                  <li key={option.key.id}>
                    <Button
                      sx={{
                        width: "100%",
                        textAlign: "left",
                        textAnchor: "left",
                      }}
                      onClick={(event) => {
                        console.log(event);
                        navigate(`/profile/${option.key.id}`);
                      }}
                    >
                      <Typography
                        textAlign={"left"}
                        sx={{ textAlign: "left", width: "100%" }}
                      >
                        {option.key.username}
                      </Typography>
                    </Button>
                  </li>
                );
              }
            }}
            renderInput={(params) => {
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
                        setSearchvalue("");
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
              <Chip key={value.id} label={value.feedname} {...getItemProps()} />
            )}
          />
          <ThemeState></ThemeState>
          <Box sx={{ flexGrow: 1 }} />
          {Renderloginstate({ User, refetch, token })}
        </Toolbar>
      </AppBar>
      {MenuState}
    </Box>
  );
}
