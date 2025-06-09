import { Stack, Box, Link, Paper } from "@mui/material";
import Comment from "../../commentsection/Comment";
const ProfileFeedComment = ({ item }) => {
  return (
    <Box
      sx={{
        paddingBottom: 1,
        border: 1,
        borderRadius: 5,
        backgroundColor: "green",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ flexDirection: "column", padding: 1 }}>
          <Box>
            <Link href="#" color="inherit">
              <h3>{item.Headline}</h3>
            </Link>
          </Box>
          <Stack></Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileFeedComment;
