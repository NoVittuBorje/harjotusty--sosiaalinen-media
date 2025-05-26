import FeedItem from "../../FeedItem"
import ProfileFeedComment from "./ProfilefeedComment"

const ProfileFeed = ({item}) => {
    console.log(item)
    return(
        <FeedItem item={item} ></FeedItem>
    )
}

export default ProfileFeed