import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import EditFieldItem from "./EditFieldItem";
import FileUpload from "../utils/upload";
import { useState } from "react";

const MyAccountpage = ({User}) => {
  const [imagePath, setImagePath] = useState(User.avatar)
  const [username,setUsername] = useState(User.username)
  const [email,setEmail] = useState(User.email)
  const [description,setDescription] = useState(User.description)
  const [firstname,setfirstname] = useState(User.firstname)
  const [lastname, setLastname] = useState(User.lastname)
  console.log(User)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Grid size={{ xs: 12, md: 4 }}></Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ textAlign: "center",border:1,borderRadius:5 }}>
            <h3>My account</h3>
            <Stack spacing={1}>
              <Box>

                <Typography>set avatar</Typography>
                <FileUpload userid={User.id} setImagePath={setImagePath}></FileUpload>
                
              </Box>
            <EditFieldItem value={username} valueType={"Username"}></EditFieldItem>
            <EditFieldItem value={email} valueType={"Email"}></EditFieldItem>
            <EditFieldItem value={description} valueType={"Description"}></EditFieldItem>
            <EditFieldItem value={firstname} valueType={"Firstname"}></EditFieldItem>
            <EditFieldItem value={lastname} valueType={"Lastname"}></EditFieldItem>

            </Stack>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}></Grid>
      </Grid>
    </Box>
  );
};
export default MyAccountpage;
