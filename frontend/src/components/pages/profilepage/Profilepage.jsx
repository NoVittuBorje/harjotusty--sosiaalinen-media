import { Box, Grid } from "@mui/system";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Divider, FormControl, List, MenuItem, Select } from "@mui/material";
import ProfileFeed from "./Profilefeed";
import { useState } from "react";
import useGetUser from "../../hooks/useGetUser";


const Profilepage = ({ User ,match}) => {
  console.log(User);
  console.log(match)
  const [type, setType] = useState("posts")
  const id = match.params.userid;
  const userdata = useGetUser({id:id})
    const handleChange = (event) => {
    setType(event.target.value);
  };
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
          <h1>profile picture</h1>
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
                <ProfileFeed id={profiledata.id} type={type}></ProfileFeed>
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
