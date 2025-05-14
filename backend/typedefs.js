const typeDefs = `#graphql
  type Feed {
    feedname:String!
    description:String!
    owner:User!
    posts:[Post]
  }
  type Comment {
      post:Post!
      user:User!
      content:String!
      replies:[Comment]
  }
  type Post {
    headline:String!
    description:String!
    owner:User!
    karma:Int!
    img:String
    feed:Feed!
    comments:[Comment]
  }
  type User {
    username: String!
    email:String!
    firstname:String
    lastname:String
    avatar:String
    relationship:String
    description:String
    work:String
    feedsubs:[Feed]
    posts:[Post]
    id: ID!
  }
  type Token {
    value: String!
  }
  
  type Query {
    me: User!
    getfeed(feedname:String!):Feed

  }

  type Mutation {
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
  }
`
module.exports = typeDefs