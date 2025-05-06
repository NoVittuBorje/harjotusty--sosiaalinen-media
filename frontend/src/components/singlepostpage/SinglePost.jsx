import { Box, List, ListItem } from "@mui/material"
import Comment from "../commentsection/Comment"
import CommentSection from "../commentsection/CommentSection"
const date = Date.now()
const postdata = [
{
    id:1,
    headline:"String",
    text:"String",
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

const SinglePost = () => {
    console.log(postdata)
    return(
        <Box>
            {postdata.map((post) => <CommentSection item={post.comments} ></CommentSection>)}
        </Box>
    )
}

export default SinglePost