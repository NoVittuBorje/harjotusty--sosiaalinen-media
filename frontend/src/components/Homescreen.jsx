import { Box, Divider, IconButton, Link, List, ListItem, ListItemButton } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
const feedData = [
    {
        id:1,
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et hendrerit libero, a suscipit eros. Nullam gravida iaculis congue. Morbi semper neque lorem, in vehicula velit maximus ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam nulla risus, aliquam blandit tempor non, feugiat et urna. In sagittis ac tellus sed malesuada. Nunc convallis tempor arcu, vitae faucibus magna molestie ut. Sed pretium, ipsum non malesuada scelerisque, felis felis imperdiet ligula, at placerat urna velit vel justo. Integer id odio orci. Donec molestie tellus libero. ",
        user:{
            id:1,
            username:"jorma"
        },
        karma:-10,

    },
    {
        id:2,
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et hendrerit libero, a suscipit eros. Nullam gravida iaculis congue. Morbi semper neque lorem, in vehicula velit maximus ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam nulla risus, aliquam blandit tempor non, feugiat et urna. In sagittis ac tellus sed malesuada. Nunc convallis tempor arcu, vitae faucibus magna molestie ut. Sed pretium, ipsum non malesuada scelerisque, felis felis imperdiet ligula, at placerat urna velit vel justo. Integer id odio orci. Donec molestie tellus libero. ",
        user:{
            id:2,
            username:"jarma"
        },
        karma:10,

    },
    {
        id:3,
        Headline:"Cats are cool",
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et hendrerit libero, a suscipit eros. Nullam gravida iaculis congue. Morbi semper neque lorem, in vehicula velit maximus ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam nulla risus, aliquam blandit tempor non, feugiat et urna. In sagittis ac tellus sed malesuada. Nunc convallis tempor arcu, vitae faucibus magna molestie ut. Sed pretium, ipsum non malesuada scelerisque, felis felis imperdiet ligula, at placerat urna velit vel justo. Integer id odio orci. Donec molestie tellus libero. ",
        user:{
            id:3,
            username:"Borje"
        },
        karma:606,

    },
]
const Homescreen = () => {
    const handleLike = () => {
        console.log("like")
    }
    const handleDislike = () => {
        console.log("dislike")
    }
    return (
        <Box style={{backgroundColor:"grey",width:"100%"}}>
            <div style={{textAlign:"center"}}>
                <h3>Feed</h3>
                <Divider></Divider>
                <Box>
                    <List>
                        {feedData.map((item) => 
                        <Box>

                        <Box sx={{display:"flex" ,flexDirection:"row-reverse"}}>
                        <ListItem>
                        <Link href="#" variant="body2">
                              {'variant="body2"'}
                            </Link>
                        
                        {item.text}
                        </ListItem>

                            <Box sx={{backgroundColor:"red",margin:0,padding:0,paddingBottom:0,paddingLeft:0}}>
                                <ListItem sx={{flexDirection:"column",width:40}}>
                                <p style={{height: 35,width: 35,borderStyle:"solid",borderRadius: 1000,borderColor:"blue",borderWidth:2,alignContent:"center",textAlign:"center",color:"blue",backgroundColor:"green" }}>{item.karma}</p>
                                <IconButton onClick={handleLike} size="small">
                                    <ThumbUpIcon></ThumbUpIcon>
                                </IconButton>
                                <IconButton onClick={handleDislike} size="small">
                                    <ThumbDownIcon></ThumbDownIcon>
                                </IconButton>
                                </ListItem>
                                <Box sx={{backgroundColor:"blue"}}>

                                </Box>
                            </Box>
                        </Box>
                        <Divider></Divider>
                        </Box>
                        )}
                    
                    </List>
                    
                </Box>

            </div>
        </Box>
    )
}
export default Homescreen