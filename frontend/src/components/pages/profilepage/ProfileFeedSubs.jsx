import InfiniteScroll from "react-infinite-scroll-component";
import useGetUserSubs from "../../hooks/useGetUserSubs";
import { Box, Link, List, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import parse from "html-react-parser";
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
                color="inherit"
                onClick={() => {
                  navigate(`/feed/${item.feedname}`);
                }}
              >
                <Box
        className={"feed"}
        sx={{
          padding:1,
          "&:hover": {
            backgroundColor: "background.hover",
          },
        }}
                  key={item.id}
                >
                  <Typography variant="h5">{item.feedname}</Typography>
                  {parse(item.description)}
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
