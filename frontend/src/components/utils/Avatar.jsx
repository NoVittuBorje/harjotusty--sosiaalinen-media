import { Avatar, ListItemAvatar } from "@mui/material";
import useGetImageUrl from "../hooks/useGetImageUrl"
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
const GetImage = ({img}) => {
    const {data,loading} = useGetImageUrl({imageId:img})
    if(!loading){
    return data
    }
}
const UserAvatar = ({user}) => {
    if(!user.img){
        return(
        <ListItemAvatar>
        <Avatar
          sx={{ width: 24, height: 24 }}
          {...stringAvatar(user.username)}
        ></Avatar>
      </ListItemAvatar>
        )
    }else{
    const data = GetImage({img:user.img})
    return(
        <img src={data.getImage} style={{maxWidth:24,maxHeight:24}}></img>
    )
}
}
export default UserAvatar