import FeedItem from "../homepage/FeedItem"
import ProfileFeedComment from "./ProfilefeedComment"

const ProfileFeed = ({item}) => {
    console.log(item)
    return(
        <FeedItem item={item} ></FeedItem>
    )
}

export default ProfileFeed