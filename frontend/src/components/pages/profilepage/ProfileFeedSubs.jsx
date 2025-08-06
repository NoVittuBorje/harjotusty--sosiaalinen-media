import InfiniteScroll from "react-infinite-scroll-component";
import useGetUserSubs from "../../hooks/useGetUserSubs";
import { Box, Link, List, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const ProfileFeedSubs = (variables) => {
  const navigate = useNavigate();
  const subs = useGetUserSubs(variables);
  const loadmore = () => {
    subs.fetchMore({ offset: subs.data.getusersubs.length });
  };
  if (subs.loading) {
    return <Box>loading</Box>;
  }
  console.log(subs.data);
  return (
    <Box sx={{}}>
      <InfiniteScroll
        dataLength={subs.data.getusersubs.length}
        next={loadmore}
        hasMore={true}
      >
        {subs.data.getusersubs.map((item) => (
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
export default ProfileFeedSubs;
