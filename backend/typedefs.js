const typeDefs = `#graphql
  type Feed {
    feedname:String!
    description:String!
    owner:User!
    subs:[User]
    posts:[Post]
    id:ID!
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
    work:String
    feedsubs:[Feed]
    posts:[Post]
    ownedfeeds:[Feed]
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    me: User!
    getfeed(
    feedname:String
    querytype:String!
    ):[Feed]
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
  }
`
module.exports = typeDefs