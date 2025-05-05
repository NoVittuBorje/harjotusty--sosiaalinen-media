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
    firstname:"Jorma",
    lastname:"Jaakkola",
    username:"xxJaakkoxx",
    relationship:relationship.Single,
    description:"Curabitur ornare felis in feugiat porttitor. Ut vitae justo ultricies, lobortis est ut, mattis elit. Nam accumsan feugiat nisi sit amet faucibus. Suspendisse sed urna vulputate, cursus velit nec, rhoncus turpis. Integer convallis faucibus sodales. ",
    work:"unemployed",
    picture:"https://m.media-amazon.com/images/I/91KXtm8Hq3L._AC_SL1500_.jpg"
}
const feedData = [
    {
        id:1,
        Headline:"Cats are cool",
        type:"comment",
        commentTo:{
            comment:"Dogs are cool",
            likes:109,
            user:{
                id:2,
                username:"Juuyoimii",
                picture:"https://www.bodyfx.co.nz/cdn/shop/products/tag-face-painting-practice-board-523381_2048x.jpg?v=1647397483"
            }
        },
        comment:"Cats are cool",
        likes:10,
        user:{
            id:1,
            username:"xxJaakkoxx",
            picture:"https://m.media-amazon.com/images/I/91KXtm8Hq3L._AC_SL1500_.jpg"
        }
    },
    {
        id:2,
        type:"post",
        header:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        Headline:"Dogs are not cool",
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et hendrerit libero, a suscipit eros. Nullam gravida iaculis congue. Morbi semper neque lorem, in vehicula velit maximus ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam nulla risus, aliquam blandit tempor non, feugiat et urna. In sagittis ac tellus sed malesuada. Nunc convallis tempor arcu, vitae faucibus magna molestie ut. Sed pretium, ipsum non malesuada scelerisque, felis felis imperdiet ligula, at placerat urna velit vel justo. Integer id odio orci. Donec molestie tellus libero. ",
        user:{
            id:1,
            username:"jorma"
        },
        karma:-10,

    },
]
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
                    {feedData.map((item) => 
                        <ProfileFeed item={item}></ProfileFeed>
                    )}
                    </List>
                    
                </Box>
            </Grid>
            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"red"}}>
                <p style={{fontSize:20}}> something</p>
            </Grid>
        </Grid>
        </Box>
    )
}

export default Profilepage