import { Avatar, Box, Button, ListItemAvatar, Typography } from "@mui/material";
import Timestamp from "./utils/Timestamp";
import { useNavigate } from "react-router";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}
const Useritem = ({ user, time }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" ,gap:0,marginBottom:1}}>
      <ListItemAvatar>
        <Avatar
          sx={{ width: 24, height: 24 }}
          {...stringAvatar(user.username)}
        ></Avatar>
      </ListItemAvatar>
      <Button sx={{paddingLeft:0}}>
        <Typography
          onClick={() => {
            navigate(`/profile/${user.id}`);
          }}
          color="whitesmoke"
          variant="h8"
          underline="none"
        >{`u/${user.username}`}</Typography>
      </Button>
      <Timestamp time={time}></Timestamp>
    </Box>
  );
};
export default Useritem;
