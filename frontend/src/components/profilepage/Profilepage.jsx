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


const User = {
    id:1,
    username:"xzxJonnexzx",
    firstname:"Jonne",
    lastname:"Jarmola",
    relationship:"single",
    description:"Lorem ipsumdfgdfg",
    work:"unemployed",
    avatar:"https://www.bodyfx.co.nz/cdn/shop/products/tag-face-painting-practice-board-523381_2048x.jpg?v=1647397483",
    posts:[
        {
            id:1,
            headline:"Cats are cool",
            text:"Mauris dignissim molestie leo, id viverra urna auctor non. Cras finibus felis vitae dolor aliquam condimentum. Vivamus a maximus arcu. Praesent aliquam posuere ipsum, id gravida erat viverra ut. Vivamus vehicula tortor vel suscipit posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi luctus ex a odio posuere tincidunt quis sit amet mi. Ut diam libero, rhoncus at venenatis gravida, elementum eget erat. Etiam interdum ornare elit, in venenatis urna egestas at. Proin fermentum cursus turpis id auctor. Nullam pulvinar, eros fringilla auctor vestibulum, ex velit accumsan lorem, eu vulputate augue nulla vitae massa. Sed posuere urna in lectus faucibus, ut euismod sem laoreet. Donec at efficitur tortor, id sagittis felis. Maecenas condimentum vulputate egestas. Vivamus laoreet sed lectus viverra mollis. ",
            user:{
                id:1,
                username:"xzxJonnexzx",
                firstname:"Jonne",
                lastname:"Jarmola",
                relationship:"single",
                description:"Lorem ipsumdfgdfg",
                work:"unemployed",
                avatar:"https://www.bodyfx.co.nz/cdn/shop/products/tag-face-painting-practice-board-523381_2048x.jpg?v=1647397483",
                posts:[],
                comments:[],
            },
            karma:1005,
            img:"post url",
            comments:[]
        }
        ],
    comments:[],
}

const Profilepage = () => {
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