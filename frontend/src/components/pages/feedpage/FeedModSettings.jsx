import {
  Autocomplete,
  Box,
  Button,
  Collapse,
  Divider,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useGetSearchUsers from "../../hooks/useGetSearchUsers";
import useEditFeed from "../../hooks/useEditFeed";
import ExpandIcon from "../../utils/ExpandIcon";
import FileUpload from "../../utils/FileUpload";

const FeedModSettings = ({ infoloading,info, item, setFeedEditOpen, User }) => {
  if(infoloading){return}
  const mods = [...info.moderators.map((mod) => mod.id), info.owner.id];
  const [editfeed, editfeedresult] = useEditFeed();

  const [OpenUnban, setOpenUnban] = useState(false);
  const [OpenBan, setOpenBan] = useState(false);
  const [OpenUnMod, setOpenUnMod] = useState(false);
  const [OpenMod, setOpenMod] = useState(false);
  const [OpenOwnership, setOpenOwnership] = useState(false);
  const [OpenAvatar, setOpenAvatar] = useState(false);
  const [imagepath, setImagePath] = useState("");

  const Uploadedimages = () => {
    if (imagepath.length != 0) {
      return <Typography>{imagepath[1]}</Typography>;
    }
  };

  const OwnerSettings = () => {
    if (item.owner.id == User.id) {
      return (
        <Box sx={{display:"flex",justifyContent:"center",justifyItems:"center"}}>
        <Stack direction={"column"} sx={{justifyContent:"center",justifyItems:"center"}}>
          <Typography variant="h6">Owner settings:</Typography>
          <Button
            className="button"
            sx={{ borderRadius: 50 }}
            onClick={() => setOpenMod(!OpenMod)}
            size="small"
            variant="outlined"
            color="inherit"
          >
            Mod User
            <ExpandIcon Open={OpenMod}></ExpandIcon>
          </Button>

          <Collapse in={OpenMod}>
            <UserSearchItem
              buttontext={"Mod selected"}
              action={"mod"}
            ></UserSearchItem>
          </Collapse>
          <Button
            className="button"
            sx={{ borderRadius: 50 }}
            onClick={() => setOpenUnMod(!OpenUnMod)}
            size="small"
            variant="outlined"
            color="inherit"
          >
            UnMod User
            <ExpandIcon Open={OpenUnMod}></ExpandIcon>
          </Button>
          <Collapse in={OpenUnMod}>
            <UserSearchItem
              buttontext={"UnMod selected"}
              action={"unmod"}
            ></UserSearchItem>
          </Collapse>
          <Button
            className="button"
            sx={{ borderRadius: 50 }}
            onClick={() => setOpenAvatar(!OpenAvatar)}
            size="small"
            variant="outlined"
            color="inherit"
          >
            Change feed avatar
            <ExpandIcon Open={OpenAvatar}></ExpandIcon>
          </Button>
          <Collapse in={OpenAvatar}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection:"column",
                
              }}
            >
              <Typography>Image: </Typography>
              <FileUpload
                setImagePath={setImagePath}
                userid={item.id}
              ></FileUpload>
              {Uploadedimages()}
                      <Button
          className="button"
          sx={{ borderRadius: 50 }}
          onClick={() =>
            editfeed({
              feedid: item.id,
              action: "changeavatar",
              content: imagepath[0],
            })
          }
          size="small"
          variant="outlined"
          color="inherit"
        >
          Save avatar
        </Button>
            </Box>
          </Collapse>
          <Button
            className="button"
            sx={{ borderRadius: 50 }}
            onClick={() => setOpenOwnership(!OpenOwnership)}
            size="small"
            variant="outlined"
            color="inherit"
          >
            Give ownership to User
            <ExpandIcon Open={OpenOwnership}></ExpandIcon>
          </Button>
          <Collapse in={OpenOwnership}>
            <UserSearchItem
              buttontext={"Give Ownership to selected"}
              action={"makeowner"}
            ></UserSearchItem>
          </Collapse>
        </Stack>
        </Box>
      );
    } else {
      return;
    }
  };
  const UserSearchItem = ({ action, buttontext }) => {
    const [SearchUsers, setSearchUsers] = useState("");

    const [SelectedUser, setSelectedUser] = useState(null);
    const { data, error, loading } = useGetSearchUsers({
      search: SearchUsers,
    });
    const filterOptions = createFilterOptions({
      limit: 10,
    });
    const debounced = useDebouncedCallback((value) => {
      setSearchUsers(value);
    }, 1000);

    const searchoptions = data ? data.getsearchusers : [];
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Autocomplete
          disablePortal
          filterOptions={filterOptions}
          value={SelectedUser}
          options={searchoptions}
          getOptionLabel={(option) => `${option.username}`}
          getOptionKey={(option) => option.username}
          renderOption={(params, option) => (
            <Typography {...params}>{option.username}</Typography>
          )}
          renderInput={(params) => (
            <TextField
              sx={{
                minWidth: 200,
                input: { color: "inherit" },
                label: { color: "inherit" },
              }}
              {...params}
              onChange={(e) => debounced(e.target.value)}
              label="Search"
            />
          )}
          onChange={(event, newValue) => {
            console.log(newValue);
            setSelectedUser(newValue);
          }}
        />
        <Button
          className="button"
          sx={{ borderRadius: 50 }}
          onClick={() =>
            editfeed({
              feedid: item.id,
              action: action,
              content: SelectedUser.id,
            })
          }
          size="small"
          variant="outlined"
          color="inherit"
        >
          {buttontext}
        </Button>
      </Box>
    );
  };

  if (!mods || !User) {
    return;
  }
  if (mods.includes(User.id)) {
    return (
      <Box>
        <Box sx={{display:"flex",justifyContent:"center",justifyItems:"center"}}>
        <Stack direction={"column"} sx={{justifyContent:"center",justifyItems:"center"}}>
          <Typography>Mod settings:</Typography>
          
          <Button
            className="button"
            sx={{ borderRadius: 50}}
            size="small"
            variant="outlined"
            color="inherit"
            onClick={() => setFeedEditOpen(true)}
          >
            Edit feed description
          </Button>

          <Button
            className="button"
            sx={{ borderRadius: 50 }}
            onClick={() => setOpenUnban(!OpenUnban)}
            size="small"
            variant="outlined"
            color="inherit"
          >
            UnBan User
            <ExpandIcon Open={OpenUnban}></ExpandIcon>
          </Button>
          <Collapse in={OpenUnban}>
            <UserSearchItem
              buttontext={"UnBan selected"}
              action={"unban"}
            ></UserSearchItem>
          </Collapse>

          <Button
            className="button"
            sx={{ borderRadius: 50 }}
            onClick={() => setOpenBan(!OpenBan)}
            size="small"
            variant="outlined"
            color="inherit"
          >
            Ban User
            <ExpandIcon Open={OpenBan}></ExpandIcon>
          </Button>
          <Collapse in={OpenBan}>
            <UserSearchItem
              buttontext={"Ban selected"}
              action={"ban"}
            ></UserSearchItem>
          </Collapse>


          
        </Stack>
        <Divider></Divider>
        
        
        </Box>
        {OwnerSettings()}
      </Box>
    );
  }
};
export default FeedModSettings;
