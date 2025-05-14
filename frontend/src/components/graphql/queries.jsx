import { gql } from '@apollo/client'

export const GET_ME = gql`
query Me {
  me {
    username
    email
    firstname
    lastname
    avatar
    relationship
    description
    work
    id
  }
}`
export const GET_FEED = gql`query Getfeed($feedname: String!) {
  getfeed(feedname: $feedname) {
    feedname
    posts {
      headline
      text
      user {
        username
      }
      karma
      img
      comments {
        replies {
          content
          user {
            username
          }
        }
      }
    }
    owner {
      username
    }
    description
  }
}`