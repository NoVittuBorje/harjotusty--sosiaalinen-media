
import ProfileFeedPosts from "./ProfileFeedPosts";
import ProfileFeedOwnedFeeds from "./ProfileFeedOwnedFeeds";
import ProfileFeedSubs from "./ProfileFeedSubs";
import ProfileFeedComment from "./ProfileFeedComment";
const ProfileFeed = ({ type, id, userdata, User, setmessage, setseverity }) => {
  const variables = {
    id: id,
  };
  console.log(variables);

  if (type === "posts") {
    return (
      <ProfileFeedPosts
        variables={variables}
        setmessage={setmessage}
        setseverity={setseverity}
        userdata={userdata}
        User={User}
      ></ProfileFeedPosts>
    );
  }
  if (type === "comments") {
    return (
      <ProfileFeedComment
        setmessage={setmessage}
        setseverity={setseverity}
        variables={variables}
        userdata={userdata}
        User={User}
      ></ProfileFeedComment>
    );
  }
  if (type === "ownedfeeds") {
    return (
      <ProfileFeedOwnedFeeds
        variables={variables}
        userdata={userdata}
      ></ProfileFeedOwnedFeeds>
    );
  }
  if (type === "subs") {
    return (
      <ProfileFeedSubs
        variables={variables}
        userdata={userdata}
      ></ProfileFeedSubs>
    );
  }
  return
};

export default ProfileFeed;
