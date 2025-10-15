const typeDefs = `#graphql
  type Feed {
    feedname:String!
    description:String!
    feedavatar:String
    subsCount:Int!
    owner:User!
    moderators:[User]
    subs:[User]
    posts:[Post]
    bannedusers:[User]
    active:Boolean
    createdAt:String
    updatedAt:String
    id:ID!
  }
  type Comment {
    post:Post
    user:User
    content:String
    replies:[Comment]
    replyto:Comment
    active:Boolean
    karma:Int
    depth:Int
    createdAt:String
    updatedAt:String
    id:ID!
  }
  type Post {
    headline:String!
    description:String!
    owner:User!
    karma:Int!
    img:String
    feed:Feed!
    commentsCount:Int
    comments:[Comment]
    active:Boolean
    locked:Boolean
    createdAt:String
    updatedAt:String
    id:ID!
  }
  type User {
    username: String!
    email:String!
    firstname:String
    lastname:String
    avatar:String
    relationship:String
    description:String
    dislikedposts:[Post]
    likedposts:[Post]
    likedcomments:[Comment]
    dislikedcomments:[Comment]
    work:String
    feedsubs:[Feed]
    nationality:String
    posts:[Post]
    ownedfeeds:[Feed]
    active:Boolean
    comments:[Comment]
    createdAt:String
    id: ID!
  }
  union Search = Feed | Post | User
  type Token {
    value: String!
  }
  scalar Upload

  input SingleFileInput {
  userId: String!
  file: Upload!
  }
  input MultiFileInput {
  userId: String!
  files: [Upload!]!
  }
  
  type Query {
    me: User!
    getuser(
    id:String!
    ):User
    getfeed(
    feedname:String
    querytype:String!
    ):[Feed]
    getfeedposts(
    feedname:String!
    orderBy:String!
    offset:Int!
    ):[Post]

    getpostcomments(
    postid:String!
    offset:Int!
    ):[Comment]

    getpopularposts(
    offset:Int!
    orderBy:String
    ):[Post]

    getpost(id:String!):Post
    getcomments(
    commentid:String!
    offset:Int!
    ):[Comment]

    getuserposts(
    userid:String!
    offset:Int!
    ):[Post]

    getusercomments(
    userid:String!
    offset:Int!
    ):[Comment]

    getusersubs(
    userid:String!
    offset:Int!
    ):[Feed]

    getuserownedfeeds(
    userid:String!
    offset:Int!
    ):[Feed]

    getuserinfo(
    userid:String!
    offset:Int!
    type:String!
    ):User

    getsearchbar(
    searchby:String!
    ):[Search]

    getsearchusers(
    searchby:String
    ):[User]
    
    getCommentsCount(
    feedname:String!):Int!

    getSubsCount(
    feedname:String!):Int!

    getFiles(userId: String!): [String!]
    
    getImage(imageId:String!):String!
  }
  
  type Mutation {
    subscribe(
      feedname: String!
      type: String!
    ): User
    createUser(
      username: String!
      email:String!
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    makeFeed(
      feedname: String!
      description: String!
    ): Feed
    makePost(
      headline: String!
      feedname: String!
      description: String!
      img: String
    ): Post
    makeComment(
      postid: String!
      content: String!
      replyto: String
    ):Comment
    modifyComment(
      commentid:String!
      action:String!
      content: String!
    ):Comment
    modifyPost(
    postid:String!
    action:String!
    content: String!
    ):Post
    modifyFeed(
    feedid:String!
    action:String!
    content:String!
    ):Search
    modifyUser(
    type:String!
    content: String!
    ): User

    dislikePost(
    id:String!
    ):Post

    likePost(
    id:String!
    ):Post

    dislikeComment(
    id:String!
    ):Comment

    likeComment(
    id:String!
    ):Comment
    
    singleUpload(input: SingleFileInput!): [String!]
    multiUpload(input: MultiFileInput!): String!
  }
`;
module.exports = typeDefs;
