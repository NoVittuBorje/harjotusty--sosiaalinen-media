import { Box, Divider, Link, Typography } from "@mui/material";
import FeedItem from "../../FeedItem";
import ProfileFeedComment from "./ProfileFeedComment";
import { useNavigate } from "react-router";
import ProfilePostsItems from "./ProfileFeedPosts";
const ProfileFeed = ({ item ,type}) => {
  if (type === "posts") {
    return (
      item.posts.map((item) => <ProfilePostsItems item={item}/>)
    );
  }
  if(type === "comments"){
    
  }
};

export default ProfileFeed;
