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
    feedsubs {
      feedname
      id
    }
    ownedfeeds{
      feedname
    }
    id
  }
}`
export const GET_FEED = gql`query Getfeed($querytype: String!, $feedname: String) {
  getfeed(querytype: $querytype, feedname: $feedname) {
    feedname
    description
    owner {
      username
    }
    subs {
      username
      id
    }
    posts {
      headline
      description
      owner {
        username
      }
      karma
      img
      id
      comments {
        user {
          username
        }
        content
        replies {
          user {
            username
          }
          content
          replies {
            user {
              username
            }
            content
            replies {
              user {
                username
              }
              content
            }
          }
        }
      }
    }
  }
}`
export const GET_ALL_FEED = gql`query Getfeed($querytype: String!, $feedname: String) {
  getfeed(querytype: $querytype, feedname: $feedname) {
    feedname
    description
  }
}`