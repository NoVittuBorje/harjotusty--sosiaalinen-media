import { Box, Grid,  } from "@mui/system"
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Divider, List } from "@mui/material";
import ProfileFeed from "./Profilefeed";

const relationship = {
    Single:"single",
    Married :"married",
    Dating:"dating",
    None:"none",
}



const Profilepage = ({User}) => {
    console.log(User)
    return(
        <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>
            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"grey"}}>
                <h1>profile picture</h1>
                <AccountBoxIcon sx={{fontSize:100}} />
            </Grid>
            <Grid size={{xs:12, md:8}} sx={{backgroundColor:"green"}}>
                <Box sx={{padding:1}}>
                <h1>{User.firstname} {User.lastname}</h1>
                <p>{User.description}</p>
                <p>Relationship status: {User.relationship}</p>
                <p>Job: {User.work}</p>
                </Box>
                <Divider></Divider>
                <Box>
                <List>
                    {User.posts.map((item) => 
                        <ProfileFeed item={item}></ProfileFeed>
                    )}
                    </List>
                    
                </Box>
            </Grid>
            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"red"}}>
                
            </Grid>
        </Grid>
        </Box>
    )
}

export default Profilepage