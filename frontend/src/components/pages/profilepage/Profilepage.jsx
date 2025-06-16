import { Box, Grid } from "@mui/system";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Divider, List } from "@mui/material";
import ProfileFeed from "./Profilefeed";
import { useState } from "react";
import useGetUser from "../../hooks/useGetUser";

const relationship = {
  Single: "single",
  Married: "married",
  Dating: "dating",
  None: "none",
};

const Profilepage = ({ User ,match}) => {
  console.log(User);
  console.log(match)
  const id = match.params.userid;
  const userdata = useGetUser({id:id})
  console.log(id);
  if (userdata.loading){
    return <p>loading...</p>
  }else{
  
  
  const data = userdata.data.getuser
  console.log(data)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 2 }} sx={{ backgroundColor: "grey" }}>
          <h1>profile picture</h1>
          <AccountBoxIcon sx={{ fontSize: 100 }} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} sx={{ backgroundColor: "green" }}>
          <Box sx={{ padding: 1 }}>
            <h1>
              {data.firstname} {data.lastname}
            </h1>
            <p>{data.description}</p>
            <p>Relationship status: {data.relationship}</p>
            <p>Job: {data.work}</p>
          </Box>
          <Divider></Divider>
          <Box>
            <List>
              {data.posts.map((item) => (
                <ProfileFeed item={item}></ProfileFeed>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }} sx={{ backgroundColor: "red" }}></Grid>
      </Grid>
    </Box>
  );
  }
};

export default Profilepage;
