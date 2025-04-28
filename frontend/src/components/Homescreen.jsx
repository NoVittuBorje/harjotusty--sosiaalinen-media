import { Box, Divider, IconButton, Link, List, ListItem, ListItemButton } from "@mui/material"

import FeedItem from "./FeedItem";

const feedData = [
    {
        id:1,
        header:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et hendrerit libero, a suscipit eros. Nullam gravida iaculis congue. Morbi semper neque lorem, in vehicula velit maximus ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam nulla risus, aliquam blandit tempor non, feugiat et urna. In sagittis ac tellus sed malesuada. Nunc convallis tempor arcu, vitae faucibus magna molestie ut. Sed pretium, ipsum non malesuada scelerisque, felis felis imperdiet ligula, at placerat urna velit vel justo. Integer id odio orci. Donec molestie tellus libero. ",
        user:{
            id:1,
            username:"jorma"
        },
        karma:-10,

    },
    {
        id:2,
        header:"Nullam gravida iaculis congue.",
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et hendrerit libero, a suscipit eros. Nullam gravida iaculis congue. Morbi semper neque lorem, in vehicula velit maximus ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam nulla risus, aliquam blandit tempor non, feugiat et urna. In sagittis ac tellus sed malesuada. Nunc convallis tempor arcu, vitae faucibus magna molestie ut. Sed pretium, ipsum non malesuada scelerisque, felis felis imperdiet ligula, at placerat urna velit vel justo. Integer id odio orci. Donec molestie tellus libero. ",
        user:{
            id:2,
            username:"jarma"
        },
        karma:11111,

    },
    {
        id:3,
        header:"Nullam gravida iaculis congue. Morbi semper neque lorem, in vehicula velit maximus ut.",
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
            <Box style={{}}>
                <h3 style={{textAlign:"center"}}>Feed</h3>
                <Divider></Divider>
                    <List>
                        {feedData.map((item) => 
                            <FeedItem item={item} handleLike={handleLike} handleDislike={handleDislike} ></FeedItem>
                        )}
                    </List>
            </Box>
        </Box>
    )
}
export default Homescreen