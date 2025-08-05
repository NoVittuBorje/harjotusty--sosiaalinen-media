import { Box, Divider, Link, Typography } from "@mui/material";
import FeedItem from "../../FeedItem";
import ProfileFeedComment from "./ProfileFeedComment";
import { useNavigate } from "react-router";
const ProfileFeedPosts = ({item}) => {
    const navigate = useNavigate()

    return(
        <Box className={"feed"} key={item.id}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Link
            onClick={() => {
              navigate(`/post/${item.id}`);
            }}
            variant="inherit"
            underline="none"
            color="white"
          >
            <Box sx={{ flexDirection: "column", padding: 1 }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                    marginBottom: 1,
                  }}
                >
                  <Typography variant="h5">{`${item.headline}`}</Typography>
                </Box>
                <Typography className="feedDesc" variant="h7" color="#c4c3c0">
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </Link>
          <Divider></Divider>
        </Box>

        <Divider></Divider>
      </Box>
    )
}
export default ProfileFeedPosts