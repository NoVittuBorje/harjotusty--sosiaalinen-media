const typeDefs = `#graphql
  type Feed {
    feedname:String!
    description:String!
    owner:User!
    subs:[User]
    posts:[Post]
    active:Boolean
    id:ID!
  }
  type Comment {
    post:Post!
    user:User!
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
    comments:[Comment]
    active:Boolean
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
    posts:[Post]
    ownedfeeds:[Feed]
    active:Boolean
    comments:[Comment]
    id: ID!
  }
  type Token {
    value: String!
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
    offset:Int!
    limit:Int!
    ):[Post]
    getpostcomments(
    postid:String!
    offset:Int!
    limit:Int!
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
    id:String!
    offset:Int!
    ):[Post]
    getusercomments(
    id:String!
    offset:Int!
    ):[Comment]
    getusersubs(
    id:String!
    offset:Int!
    ):User
    getuserownedfeeds(
    id:String!
    offset:Int!
    ):User

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
  }
`
module.exports = typeDefs