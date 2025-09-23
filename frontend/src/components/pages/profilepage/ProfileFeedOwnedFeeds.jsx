import { Box, Stack, Link, Typography } from "@mui/material";
import useGetUserOwnedFeeds from "../../hooks/useGetUserOwnedFeeds";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import Timestamp from "../../utils/Timestamp";
import parse from "html-react-parser";
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
        {ownedfeeds.data.getuserownedfeeds.map((item, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ flexDirection: "column", padding: 1 }}>
              <Link
                variant="inherit"
                underline="none"
                color="inherit"
                onClick={() => {
                  navigate(`/feed/${item.feedname}`);
                }}
              >
                <Box
                  className={"feed"}
                  sx={{
                    padding: 1,
                    boxShadow: 1,
                    "&:hover": {
                      backgroundColor: "background.dark",
                    },
                  }}
                  key={item.id}
                >
                  <Typography variant="h5">{item.feedname}</Typography>
                  {parse(item.description)}
                  <Typography>
                    Created :<Timestamp time={item.createdAt}></Timestamp>
                  </Typography>
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
