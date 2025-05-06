import { Box, Divider, Grid, List, } from "@mui/material"

import FeedItem from "./FeedItem";

const date = Date.now()
const postdata = [
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
    comments:[
        {
            id:1,
            timestamp: 37834875757,
            content:"Cats are cool",
            karma:6,
            user:{
                username:"xzxJonnexzx",
                avatar:"https://www.bodyfx.co.nz/cdn/shop/products/tag-face-painting-practice-board-523381_2048x.jpg?v=1647397483",
                id:1,
            },
            replies:[
                {
                    id:1,
                    postId:1,
                    timestamp: date,
                    content:"Dogs are cool",
                    likes:29,
                    user:{
                        id:2,
                        username:"Janne",
                        avatar:"https://www.bodyfx.co.nz/cdn/shop/products/tag-face-painting-practice-board-523381_2048x.jpg?v=1647397483"
                        },
                    replies:[
                        {
                            id:2,
                            postId:1,
                            user:{
                              id:3,
                              username:"Jappe",
                              avatar:"https://www.bodyfx.co.nz/cdn/shop/products/tag-face-painting-practice-board-523381_2048x.jpg?v=1647397483"
                              },
                            timestamp: date,
                            content:"Dogs are not cool",
                            replies:[],
                        },
                        {
                            id:3,
                            postId:1,
                            user:{
                              id:4,
                              username:"Joni",
                              avatar:"https://www.bodyfx.co.nz/cdn/shop/products/tag-face-painting-practice-board-523381_2048x.jpg?v=1647397483"
                              },
                            timestamp: date,
                            content:"Dogs are still cool",
                            replies:[],
                        },
                    ],
            },
            ]
        }
    ]
}
]
const Homescreen = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} sx={{flexDirection:"row"}}>
            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"grey"}}>

            </Grid>
            <Grid size={{xs:12, md:8}} sx={{backgroundColor:"grey"}}>
                <h3 style={{textAlign:"center"}}>Popular Feed</h3>
                <Divider></Divider>
                    <List>
                        {postdata.map((item) => 
                            <FeedItem item={item} ></FeedItem>
                        )}
                    </List>
            </Grid>
            <Grid size={{xs:12, md:2}} sx={{backgroundColor:"grey"}}>

            </Grid>
        </Grid>
        </Box>
    )
}
export default Homescreen