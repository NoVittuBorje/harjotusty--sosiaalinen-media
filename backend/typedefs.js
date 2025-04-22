const typeDefs = `#graphql
  type User {
    username: String!
    password: String!
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
    password: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token
  
  }
`
module.exports = typeDefs