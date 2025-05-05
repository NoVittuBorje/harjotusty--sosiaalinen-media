import ProfileFeedComment from "./ProfilefeedComment"
import ProfileFeedPost from "./ProfilefeedPost"

const ProfileFeed = ({item}) => {
    console.log(item)
    if (item.type == "post")
    return(
        <ProfileFeedPost item={item} ></ProfileFeedPost>
    )
    if (item.type == "comment")
    return(
        <ProfileFeedComment item={item}/>
    )
}

export default ProfileFeed