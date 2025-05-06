import { Box, Divider, IconButton, Link, List, ListItem, ListItemButton,Typography } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useNavigate } from "react-router";
const FeedItem = ({item}) => {
    const navigate = useNavigate()

    const handleLike = () => {
        console.log("like")
    }
    const handleDislike = () => {
        console.log("dislike")
    }

    console.log(item)
    return (
        <Box className={"feed"}>
            <Box sx={{display:"flex" ,flexDirection:"column"}}>
            <Link onClick={() => {navigate(`/post/${item.id}`)}} variant="inherit" underline="none" color="white">
                <Box sx={{flexDirection:"column",padding:1}}>
                <Typography variant="h5" >{item.headline}</Typography>
                <Typography variant="h7" color="#c4c3c0">{item.text}</Typography>
                </Box>
                </Link>
            <Box className={"feedfooter"}>
                <IconButton onClick={handleLike} size="small">
                    <ThumbUpIcon style={{color:"green"}}></ThumbUpIcon>
                </IconButton>

                <Box className={"feedfooterkarma"}>
                    <a style={{paddingTop:0,textAlignVertical:"top"}}>{item.karma}</a>
                </Box>

                <IconButton onClick={handleDislike} size="small">
                    <ThumbDownIcon style={{color:"red"}} ></ThumbDownIcon>
                </IconButton>

            </Box>
        </Box>
        
        <Divider></Divider>
        </Box>
    )
}
export default FeedItem