import { Box, Divider, IconButton, Link, List, ListItem, ListItemButton, } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const FeedItem = ({item,handleDislike,handleLike}) => {
    console.log(item)
    return (
        <Box sx={{paddingBottom:1,border:1,borderRadius:5,backgroundColor:"green"}}>
            <Box sx={{display:"flex" ,flexDirection:"column"}}>
                <Box sx={{flexDirection:"column",padding:1}}>
                <Box>
                    <Link href="#" color="inherit">
                        <h3>{item.header}</h3>
                    </Link>
                </Box>
                <Box>
                    {item.text}
                </Box>
                </Box>
            <Box sx={{backgroundColor:"red",padding:0}}>
                <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>

                <Box>
                <IconButton onClick={handleLike} size="small">
                    <ThumbUpIcon></ThumbUpIcon>
                </IconButton>
                </Box>
                <Box sx={{height: 35,width: 35,borderStyle:"solid",borderRadius: 1000,borderColor:"blue",borderWidth:2,alignContent:"center",textAlign:"center",color:"blue",textAlignVertical:"center",}}>
                    <a style={{paddingTop:0,textAlignVertical:"top"}}>{item.karma}</a>
                </Box>
                <Box>
                <IconButton onClick={handleDislike} size="small">
                    <ThumbDownIcon></ThumbDownIcon>
                </IconButton>
                </Box>
                
                </Box>
                <Box sx={{backgroundColor:"blue"}}>

                </Box>
            </Box>
        </Box>
        <Divider></Divider>
        </Box>
    )
}
export default FeedItem