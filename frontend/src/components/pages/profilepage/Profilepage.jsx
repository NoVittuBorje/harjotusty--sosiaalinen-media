import { Box, Grid, Stack } from "@mui/system";
import {
  CircularProgress,
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
import UserAvatar from "../../utils/UserAvatar";
import parse from "html-react-parser";
import formatNumber from "../../utils/FormatNumber";
const Profilepage = ({ User, match, setmessage, setseverity }) => {
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
    return <CircularProgress></CircularProgress>;
  } else {
    const profiledata = userdata.data ? userdata.data.getuser : [];
    console.log(profiledata);
    const ProfileDesc = ({ profiledata }) => {
      if (profiledata.description) {
        return <>{parse(profiledata.description)}</>;
      } else {
        return;
      }
    };
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
          <Grid size={{ xs: 12, md: 2 }} sx={{}}></Grid>
          <Grid size={{ xs: 12, md: 8 }} sx={{}}>
            <Box sx={{ padding: 1 }}>
              <Grid
                sx={{
                  paddingBottom: 5,
                  flexDirection: "row",
                  justifyItems: "center",
                  justifyContent: "center",
                }}
                container
              >
                <Grid>
                  <Stack>
                    <Typography variant="h4">{profiledata.username}</Typography>
                    <UserAvatar
                      height={100}
                      width={100}
                      user={profiledata}
                    ></UserAvatar>
                    <Typography>{`User karma: ${formatNumber(
                      profiledata.userKarma
                    )}`}</Typography>
                  </Stack>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Typography>{`Disliked posts: ${profiledata.dislikedposts.length}`}</Typography>
                  <Typography>{`Disliked comments: ${profiledata.dislikedcomments.length}`}</Typography>
                  <Typography>{`Subs:  ${profiledata.feedsubs.length}`}</Typography>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography>{`Liked posts: ${profiledata.likedposts.length}`}</Typography>
                  <Typography>{`Liked comments: ${profiledata.likedcomments.length}`}</Typography>
                  <Typography>{`Owned feeds: ${profiledata.ownedfeeds.length}`}</Typography>
                </Grid>
              </Grid>

              <Grid size={{ xs: 12 }} container flexDirection={"row"}></Grid>
              <Grid></Grid>
              <Divider></Divider>
              <ProfileDesc profiledata={profiledata}></ProfileDesc>

              <Divider></Divider>
            </Box>
            <Box sx={{ padding: 1 }}>
              <FormControl>
                <Select
                  defaultValue={"posts"}
                  name="select-info"
                  id="select-info"
                  size="small"
                  sx={{ color: "inherit" }}
                  onChange={handleChange}
                >
                  <Typography sx={{ paddingLeft: 2 }}>Sort by</Typography>
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
                  setmessage={setmessage}
                  setseverity={setseverity}
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
