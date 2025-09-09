import { Box, Grid, Stack } from "@mui/system";
import {
  Divider,
  FormControl,
  List,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ProfileFeed from "./Profilefeed";
import { useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import UserAvatar from "../../utils/Avatar";

const Profilepage = ({ User, match }) => {
  console.log(User);
  console.log(match);

  const [type, setType] = useState("posts");
  const id = match.params.userid;
  const userdata = useGetUser({ id: id });
  const handleChange = (event) => {
    setType(event.target.value);
  };

  console.log(id);
  if (userdata.loading) {
    return <p>loading...</p>;
  } else {
    const profiledata = userdata.data ? userdata.data.getuser : [];
    console.log(profiledata);

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
          <Grid size={{ xs: 12, md: 2 }} sx={{}}></Grid>
          <Grid size={{ xs: 12, md: 8 }} sx={{}}>
            <Box sx={{ padding: 1 }}>
              <Grid sx={{ flexDirection: "row" }} container size={{ xs: 12 }}>
                <Grid>
                  <Stack>
                    <Typography variant="h4">{profiledata.username}</Typography>
                    <UserAvatar
                      height={100}
                      width={100}
                      user={profiledata}
                    ></UserAvatar>
                  </Stack>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12 }} container flexDirection={"row"}>
                <Grid size={{ xs: 4 }}>
                  <Typography>{`Disliked posts: ${profiledata.dislikedposts.length}`}</Typography>
                  <Typography>{`Disliked comments: ${profiledata.dislikedcomments.length}`}</Typography>
                  <Typography>{`Subs:  ${profiledata.feedsubs.length}`}</Typography>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Typography>{`Liked posts: ${profiledata.likedposts.length}`}</Typography>
                  <Typography>{`Liked comments: ${profiledata.likedcomments.length}`}</Typography>

                  <Typography>{`Owned feeds: ${profiledata.ownedfeeds.length}`}</Typography>
                </Grid>
              </Grid>
              <Grid></Grid>

              <Typography variant="h8">{profiledata.description}</Typography>
            </Box>
            <Box sx={{ padding: 1 }}>
              <FormControl>
                <Select
                  defaultValue={"posts"}
                  name="select-info"
                  id="select-info"
                  sx={{ color: "white" }}
                  onChange={handleChange}
                >
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
                <ProfileFeed
                  id={profiledata.id}
                  User={User}
                  userdata={userdata.data.getuser}
                  type={type}
                ></ProfileFeed>
              </List>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }} sx={{}}></Grid>
        </Grid>
      </Box>
    );
  }
};

export default Profilepage;
