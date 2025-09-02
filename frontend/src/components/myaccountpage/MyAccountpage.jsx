import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import EditFieldItem from "./EditFieldItem";
import FileUpload from "../utils/upload";
import { useState } from "react";
import UserAvatar from "../utils/Avatar";
import useEditUser from "../hooks/useEditUser";

const MyAccountpage = ({ User }) => {
  const [imagePath, setImagePath] = useState(User.avatar);
  const [username, setUsername] = useState(User.username);
  const [email, setEmail] = useState(User.email);
  const [description, setDescription] = useState(User.description);
  const [firstname, setFirstname] = useState(User.firstname);
  const [lastname, setLastname] = useState(User.lastname);
  const [relationship, setRelationship] = useState(User.relationship);
  const [work, setWork] = useState(User.work);
  const [open, setOpen] = useState(false);
  const [avataredit, setavataredit] = useState(false);
  const [edit, result] = useEditUser();
  console.log(User);
  console.log(imagePath);
  const handleRelationshipchange = (event) => {
    setRelationship(event.target.value);
  };
  const handleSave = async ({ content, type }) => {
    console.log("save");
    console.log(content, type);
    const data = await edit({ content: content, type: type });
    console.log(data);
  };
  const EditAvatar = () => {
    if (avataredit) {
      return (
        <Box>
          <FileUpload userid={User.id} setImagePath={setImagePath}></FileUpload>

          <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            size="small"
            variant="outlined"
            color=""
            onClick={() => setavataredit(!avataredit)}
          >
            cancel
          </Button>
        </Box>
      );
    } else {
      return (
        <Stack>
          <Box
            sx={{
              justifyContent: "center",
              borderTop: 1,
              display: "flex",
            }}
          >
            <Box sx={{flexDirection:"column",paddingBottom:1}}>
            <Box >
              <Typography paddingRight={1}>Avatar:</Typography>
            </Box>
            <Box>
              <UserAvatar width={100} height={100} user={User}></UserAvatar>
            </Box>
            </Box>
          </Box>
          <Box>
            <Button
              className={"button"}
              style={{ borderRadius: 50 }}
              size="small"
              variant="outlined"
              color=""
              onClick={() => setavataredit(!avataredit)}
            >
              edit
            </Button>
          </Box>
        </Stack>
      );
    }
  };
  const EditSelector = () => {
    if (open) {
      return (
        <Stack>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel color="">Relationship: </InputLabel>
            <Select
              onChange={handleRelationshipchange}
              defaultValue={User.relationship}
              value={relationship}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <Button
              className={"button"}
              style={{ borderRadius: 50 }}
              size="small"
              variant="outlined"
              color=""
              onClick={() =>
                handleSave({ content: relationship, type: "relationship" })
              }
            >
              save
            </Button>

            <Button
              className={"button"}
              style={{ borderRadius: 50 }}
              size="small"
              variant="outlined"
              color=""
              onClick={() => setOpen(!open)}
            >
              cancel
            </Button>
          </Box>
        </Stack>
      );
    } else {
      return (
        <Box>
          <Typography>{`Relationship: ${User.relationship}`} </Typography>
          <Button
            className={"button"}
            style={{ borderRadius: 50 }}
            size="small"
            variant="outlined"
            color=""
            onClick={() => setOpen(!open)}
          >
            edit
          </Button>
        </Box>
      );
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={1} sx={{ flexDirection: "row" }}>
        <Box
          className={"center"}
          sx={{ textAlign: "center", border: 1, borderRadius: 5 }}
        >
          <h3>My account</h3>
          <Stack spacing={1}>
            <Box sx={{ borderTop: 1 }} padding={1}>
              <Typography>Id: {User.id}</Typography>
            </Box>

            <EditAvatar></EditAvatar>

            <EditFieldItem
              value={username}
              valueType={"Username"}
              handleSave={handleSave}
            ></EditFieldItem>
            <EditFieldItem
              value={email}
              valueType={"Email"}
              handleSave={handleSave}
            ></EditFieldItem>
            <EditFieldItem
              value={description}
              valueType={"Description"}
              handleSave={handleSave}
            ></EditFieldItem>
            <EditFieldItem
              value={firstname}
              valueType={"Firstname"}
              handleSave={handleSave}
            ></EditFieldItem>
            <EditFieldItem
              value={lastname}
              valueType={"Lastname"}
              handleSave={handleSave}
            ></EditFieldItem>
            <Box sx={{ borderTop: 1, padding: 1 }}>
              <EditSelector></EditSelector>
            </Box>
            <EditFieldItem
              value={work}
              valueType={"Work"}
              handleSave={handleSave}
            ></EditFieldItem>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
};
export default MyAccountpage;
