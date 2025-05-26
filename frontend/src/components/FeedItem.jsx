import { Box, Chip, Divider, IconButton, Link, List, ListItem, ListItemButton,TextareaAutosize,Typography } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
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
                <Box>
                <Typography className="feedDesc" variant="h7" color="#c4c3c0">{item.description}</Typography>
                </Box>
                </Box>
                </Link>
            <Divider></Divider>
            <Box className={"feedfooter"}>
                <Box className={"feedfooterkarma"} >
                <IconButton onClick={handleLike} size="small">
                    <ArrowUpwardRoundedIcon style={{color:"green"}}></ArrowUpwardRoundedIcon>
                </IconButton>

                <Box>
                    <a style={{paddingTop:0,textAlignVertical:"top"}}>{item.karma}</a>
                </Box>

                <IconButton onClick={handleDislike} size="small">
                    <ArrowDownwardRoundedIcon style={{color:"red"}}></ArrowDownwardRoundedIcon>
                </IconButton>
                </Box>
            </Box>
            
        </Box>
        
        <Divider></Divider>
        </Box>
    )
}
export default FeedItem