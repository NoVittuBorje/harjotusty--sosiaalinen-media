import { Stack,Box,Link,Paper } from "@mui/material"
import Comment from "../Comment"
const ProfileFeedComment = ({item}) => {

    return(
        <Box sx={{paddingBottom:1,border:1,borderRadius:5,backgroundColor:"green"}}>
        <Box sx={{display:"flex" ,flexDirection:"column"}}>
            <Box sx={{flexDirection:"column",padding:1}}>
            <Box>
                <Link href="#" color="inherit">
                    <h3>{item.Headline}</h3>
                </Link>
            </Box>
                <Stack>
                    <Comment comment={item.commentTo.comment} user={item.commentTo.user.username} img={item.commentTo.user.picture} commentpadding={0} likes={item.commentTo.likes}></Comment>
                    <Comment comment={item.comment} user={item.user.username} likes={item.likes} commentpadding={2} img={item.user.picture}></Comment>
                </Stack>
            </Box>
    </Box>
    </Box>
    )
}

export default ProfileFeedComment