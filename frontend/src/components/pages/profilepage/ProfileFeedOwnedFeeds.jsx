import { Box, Stack,Link, Typography } from "@mui/material";
import useGetUserOwnedFeeds from "../../hooks/useGetUserOwnedFeeds";
import InfiniteScroll from "react-infinite-scroll-component";
import {useNavigate } from "react-router";
import Timestamp from "../../utils/Timestamp";

const ProfileFeedOwnedFeeds = (variables) => {
  const navigate = useNavigate();
  const ownedfeeds = useGetUserOwnedFeeds(variables);
  const loadmore = () => {
    ownedfeeds.fetchMore({ offset: ownedfeeds.data.getuserownedfeeds.length });
  };
  if (ownedfeeds.loading) {
    return <Box>loading</Box>;
  }
  return (
    <Box sx={{}}>
      <InfiniteScroll
        dataLength={ownedfeeds.data.getuserownedfeeds.length}
        next={loadmore}
        hasMore={true}
      >
        {ownedfeeds.data.getuserownedfeeds.map((item) => (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ flexDirection: "column", padding: 1 }}>
              <Link
                variant="inherit"
                underline="none"
                color="white"
                onClick={() => {
                  navigate(`/feed/${item.feedname}`);
                }}
              >
                <Box className={"feed"} sx={{ padding: 1 }}>
                  <Typography variant="h5">{item.feedname}</Typography>
                  <Typography variant="h6">{item.description}</Typography>
                  <Typography>Created :<Timestamp time={item.createdAt}></Timestamp></Typography>
                  
                </Box>
              </Link>
              <Stack></Stack>
            </Box>
          </Box>
        ))}
      </InfiniteScroll>
    </Box>
  );
};
export default ProfileFeedOwnedFeeds;
