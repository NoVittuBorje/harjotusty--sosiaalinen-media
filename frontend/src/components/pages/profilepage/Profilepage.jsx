import { Box, Grid } from "@mui/system";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Avatar, Divider, FormControl, List, MenuItem, Select, Typography } from "@mui/material";
import ProfileFeed from "./Profilefeed";
import { useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import UserAvatar from "../../utils/Avatar";
import useGetImageUrl from "../../hooks/useGetImageUrl";


const Profilepage = ({ User ,match}) => {
  console.log(User);
  console.log(match)
  const imagedata = useGetImageUrl({imageId:User.avatar})

  const [type, setType] = useState("posts")
  const id = match.params.userid;
  const userdata = useGetUser({id:id})
    const handleChange = (event) => {
    setType(event.target.value);
  };
  const ProfilePicture = () => {
    if(!imagedata.loading){
    return(
      <Avatar sx={{width:100,height:100}} src={imagedata.data.getImage}></Avatar>
    )}else{
      return <UserAvatar height={100} width={100} user={User}></UserAvatar>
    }
  }
  console.log(id);
  if (userdata.loading){
    return <p>loading...</p>
  }else{
  const profiledata = userdata.data ? userdata.data.getuser : []
  console.log(profiledata)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 2 }} sx={{}}>
          <Typography variant="h4" >{profiledata.username}</Typography>
          {ProfilePicture()}
          <Typography variant="h6">{profiledata.description}</Typography>
          <AccountBoxIcon sx={{ fontSize: 100 }} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} sx={{  }}>
          <Box sx={{ padding: 1 }}>
          <FormControl>
          <Select defaultValue={"posts"} name="select-info" id="select-info" sx={{color:"white"}} onChange={handleChange}>
            <MenuItem value={"posts"}>Posts</MenuItem>
            <MenuItem value={"subs"}>Subs</MenuItem>
            <MenuItem value={"comments"}>Comments</MenuItem>
            <MenuItem value={"ownedfeeds"}>Owned feeds</MenuItem>
          </Select>
          </FormControl>
          </Box>
          <Divider></Divider>
          <Box>
            <List>
                <ProfileFeed id={profiledata.id} User={User} userdata={userdata.data.getuser} type={type}></ProfileFeed>
            </List>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }} sx={{ }}></Grid>
      </Grid>
    </Box>
  );
  }
};

export default Profilepage;
