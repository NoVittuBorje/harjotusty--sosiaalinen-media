import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import useMe from './hooks/useMe';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import FeedIcon from '@mui/icons-material/Feed';
import useGetManyFeeds from './hooks/useGetManyFeeds';

  

 


export default function PrimarySearchAppBar({setUser,User,refetch}) {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const feeds = useGetManyFeeds()
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginanchorEl, setLoginAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isLoginMenuOpen = Boolean(loginanchorEl);
  const menuId = 'primary-search-account-menu';
  const loginMenuId = 'login-menu'
  console.log(User)
  console.log(feeds)
  const handleLoginMenuOpen = (event) => {
    setLoginAnchorEl(event.currentTarget)
  }
   const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleProfileMenuOpen = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };

  const handleLoginMenuClose = () => {
    setLoginAnchorEl(null)
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuClick = () => {
    console.log("profile Page")
    navigate("/profile")
    handleMenuClose()
  }
  const handleMyaccountClick = () => {
    console.log("my acc page")
    handleMenuClose()
  }
  const handleLoginClick = () => {
    console.log("login page")
    navigate("/login")
    handleLoginMenuClose()
  }
  const handleLogoutClick = () => {
    console.log("logout")
    handleMenuClose()
    setUser(null)
    localStorage.clear()
    
  }
  const handleRegisterClick = () => {
    console.log("register page")
    navigate("/register")
    handleLoginMenuClose()
  }
  const handleHomeClick = () => {
    console.log("home")
    navigate("/")
  }
  const handleMakeNewFeedClick = () => {
    console.log("makenewfeed")
    navigate("/makefeed")
  }
  const MenuStatelogin = ({User}) => {
    if(User){
      return(
          <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClick}>Profile</MenuItem>
      <MenuItem onClick={handleMyaccountClick}>My account</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>)
    }else{
      return (
      <Menu
      anchorEl={loginanchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={loginMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isLoginMenuOpen}
      onClose={handleLoginMenuClose}
    >
      <MenuItem onClick={handleLoginClick}>Login</MenuItem>
      <MenuItem onClick={handleRegisterClick}>Register</MenuItem>

    </Menu>
      )
    }
  }
  const DrawerState = ({User}) => {
  if (User){
  return(
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
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
            <ListItemButton>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary={"Owned feeds"} />
            </ListItemButton>
          </ListItem>
      </List>
      
      <List>
        {User.ownedfeeds.map((feed) => (
          <ListItem key={feed.feedname} disablePadding>
            <ListItemButton onClick={() => { navigate(`/feed/${feed.feedname}`)}}>
              <ListItemText primary={feed.feedname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    <Divider />
      <List>
          <ListItem key="subscribedfeeds" disablePadding>
            <ListItemButton onClick={handleMakeNewFeedClick}>
              <ListItemIcon>
                <FeedIcon/>
              </ListItemIcon>
              <ListItemText primary={"Subscribed feeds"} />
            </ListItemButton>
          </ListItem>
        {User.feedsubs ? User.feedsubs.map((subs) => (
          <ListItem key={subs.feedname} disablePadding>
            <ListItemButton>
              <ListItemText primary={subs.feedname}/>
            </ListItemButton>
          </ListItem>
        )) :null}
      </List>
    </Box>
  );}else{
  if (feeds.loading | !feeds.data){
    return <Box>...loading</Box>
  }else{
  return(
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
          <ListItem key="popularfeeds" disablePadding>
            <ListItemButton onClick={handleMakeNewFeedClick}>
              <ListItemIcon>
                <FeedIcon/>
              </ListItemIcon>
              <ListItemText primary={"Popular feeds"} />
            </ListItemButton>
          </ListItem>
        
      </List>
      <Divider />
      <List>
        {feeds.data.getfeed.map((feed) => (
          <ListItem key={feed.feedname} disablePadding>
            <ListItemButton onClick={() => { navigate(`/feed/${feed.feedname}`)}}>
              <ListItemText primary={feed.feedname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  )}
  }
  }
  const MenuState = MenuStatelogin({User})
  const DrawerList = DrawerState({User})

  const Renderloginstate = ({User}) => {
    if (!User){
      return(
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          
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
      )
    }else{
      return(
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton size="large" aria-label="show new dms" color="inherit">
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
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
      )

    }
  }

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


          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {Renderloginstate({User,refetch,token})}
        </Toolbar>
      </AppBar>
      {MenuState}
      
    </Box>
  )
}
