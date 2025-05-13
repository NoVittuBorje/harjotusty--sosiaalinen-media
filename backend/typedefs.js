const typeDefs = `#graphql
  type Feed {
    feedname:String!
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
    text:String!
    user:User!
    karma:Int!
    img:String
    subfeed:Feed!
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
  me: User

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
  
  }
`
module.exports = typeDefs