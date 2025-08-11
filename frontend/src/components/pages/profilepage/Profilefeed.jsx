
import ProfileFeedComment from "./ProfileFeedComment";
import ProfileFeedPosts from "./ProfileFeedPosts";
import ProfileFeedOwnedFeeds from "./ProfileFeedOwnedFeeds";
import ProfileFeedSubs from "./ProfileFeedSubs";
const ProfileFeed = ({ type, id,userdata }) => {
  const variables = {
    id: id,
  };
  console.log(variables);

  if (type === "posts") {
    return <ProfileFeedPosts variables={variables} userdata={userdata}></ProfileFeedPosts>;
  }
  if (type === "comments") {
    return <ProfileFeedComment variables={variables} userdata={userdata}></ProfileFeedComment>;
  }
  if (type === "ownedfeeds") {
    return <ProfileFeedOwnedFeeds variables={variables} userdata={userdata}></ProfileFeedOwnedFeeds>
  }
  if (type === "subs") {
    return <ProfileFeedSubs variables={variables} userdata={userdata}></ProfileFeedSubs>
  }
};

export default ProfileFeed;
