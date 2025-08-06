
import ProfileFeedComment from "./ProfileFeedComment";
import ProfileFeedPosts from "./ProfileFeedPosts";
import ProfileFeedOwnedFeeds from "./ProfileFeedOwnedFeeds";
import ProfileFeedSubs from "./ProfileFeedSubs";
const ProfileFeed = ({ type, id }) => {
  const variables = {
    id: id,
  };
  console.log(variables);

  if (type === "posts") {
    return <ProfileFeedPosts variables={variables}></ProfileFeedPosts>;
  }
  if (type === "comments") {
    return <ProfileFeedComment variables={variables}></ProfileFeedComment>;
  }
  if (type === "ownedfeeds") {
    return <ProfileFeedOwnedFeeds variables={variables}></ProfileFeedOwnedFeeds>
  }
  if (type === "subs") {
    return <ProfileFeedSubs variables={variables}></ProfileFeedSubs>
  }
};

export default ProfileFeed;
