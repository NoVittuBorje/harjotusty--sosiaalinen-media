
User = {
    id:Id,
    username:String,
    firstname:String,
    lastname:String,
    relationship:String,
    description:String,
    work:String,
    avatar:AvatarUrl,
    posts:[],
    comments:[...Comment],
}

Post = {
        id:Id,
        headline:String,
        text:String,
        user:User,
        karma:Number,
        img
        comments:[...Comment]
    },

Comment = {
        id:Id,
        timestamp: Timestamp,
        content:String,
        karma:Number,
        user:User,
        replies:[...Comment]
},

example post 
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
example subfeed
{
    feedname:String,
    posts:[
        {
            id:Id,
        timestamp:Number ,
        content:{
            post
        }
        },
    ]
}