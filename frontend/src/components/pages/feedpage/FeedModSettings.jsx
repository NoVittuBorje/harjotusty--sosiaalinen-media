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

const FeedModSettings = ({ mods, item, setFeedEditOpen, User }) => {
  console.log(mods);
  console.log(item);
  const [editfeed, editfeedresult] = useEditFeed();

  const [OpenUnban, setOpenUnban] = useState(false);
  const [OpenBan, setOpenBan] = useState(false);
   const [OpenUnMod, setOpenUnMod] = useState(false);
  const [OpenMod, setOpenMod] = useState(false);

  const UserSearchItem = ({action,}) => {
  const [SearchUsers, setSearchUsers] = useState("");
  const [SearchValue, setSearchValue] = useState("");
  const [SelectedUser, setSelectedUser] = useState(null);
  const {data,error,loading} = useGetSearchUsers({
    search: SearchUsers,
  });
    const filterOptions = createFilterOptions({
    limit: 10,
  });
    const debounced = useDebouncedCallback((value) => {
    setSearchUsers(value);
  }, 1000);
  const searchoptions = data
    ? data.getsearchusers
    : [];
    return (
      <Box>
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
          {action} selected
        </Button>
      </Box>
    );
  };

  if (!mods || !User) {
    return;
  }
  if (mods.includes(User.id)) {
    return (
      <Box
        width={200}
        minWidth={200}
        sx={{ justifyContent: "center", justifyItems: "center" }}
      >
        <Stack
          spacing={1}
          direction={"column"}
          sx={{ justifyContent: "center", justifyItems: "center" }}
        >
          <Typography>Mod settings:</Typography>
          <Button
            className="button"
            sx={{ borderRadius: 50 }}
            size="small"
            variant="outlined"
            color="inherit"
            onClick={() => setFeedEditOpen(true)}
          >
            Edit feed description
          </Button>
          <Box>
            <Button
              className="button"
              sx={{ borderRadius: 50 }}
              onClick={() => setOpenUnban(!OpenUnban)}
              size="small"
              variant="outlined"
              color="inherit"
            >
              Unban User
            </Button>
            <Collapse in={OpenBan}>
            <UserSearchItem action={"ban"}></UserSearchItem>
            </Collapse>
            <Collapse in={OpenUnban}>
               <UserSearchItem action={"unban"}></UserSearchItem>
            </Collapse>
            <Collapse in={OpenMod}>
                           <UserSearchItem action={"mod"}></UserSearchItem>
                           </Collapse>
                           <Collapse in={OpenUnMod}>
               <UserSearchItem action={"unmod"}></UserSearchItem>
               </Collapse>
          </Box>
        </Stack>
        <Divider></Divider>
      </Box>
    );
  }
};
export default FeedModSettings;
