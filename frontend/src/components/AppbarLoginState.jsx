import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useMe from './hooks/useMe';
const Renderloginstate = ({loginMenuId,handleLoginMenuOpen,handleProfileMenuOpen,menuId}) => {
    const {data,loading,error,refetch} = useMe()
    const [User, setUser] = React.useState(null)
    const token = sessionStorage.getItem("token")
    console.log(data,loading,error)
    if (!User && token && !loading){
        console.log(User,token,data)
        const me = data ? data.me : null
        console.log(me,loading)
    if(me){
      console.log(me)
      setUser(me)
    }
  }
    if (!token){
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
export default Renderloginstate