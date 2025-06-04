import { Box, Chip, Divider, IconButton, Link, List, ListItem, ListItemButton,TextareaAutosize,Typography } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { useNavigate } from "react-router";
import KarmaItem from "./KarmaItem";
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
                <Box>
                <Typography className="feedDesc" variant="h7" color="#c4c3c0">{item.description}</Typography>
                </Box>
                </Box>
                </Link>
            <Divider></Divider>
            <Box className={"footer"}>
                <KarmaItem handleDislike={handleDislike} handleLike={handleLike} karma={item.karma}></KarmaItem>
            </Box>
            
        </Box>
        
        <Divider></Divider>
        </Box>
    )
}
export default FeedItem