import { Box,Divider,Link } from "@mui/material"
const ProfileFeedPost = ({item}) => {
    return(
        <Box sx={{paddingBottom:1,border:1,borderRadius:5,backgroundColor:"green"}}>
        <Box sx={{display:"flex" ,flexDirection:"column"}}>
            <Box sx={{flexDirection:"column",padding:1}}>
            <Box>
                <Link href="#" color="inherit">
                    <h3>{item.Headline}</h3>
                </Link>
            </Box>
            <Box>
                {item.text}
            </Box>
            </Box>
    </Box>
    </Box>
    )
}
export default ProfileFeedPost