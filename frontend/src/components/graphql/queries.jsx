import { gql } from '@apollo/client'

export const GET_ME = gql`
query Query {
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
    posts {
      description
      feed {
        feedname
      }
      headline
      id
      img
      karma
    }
    ownedfeeds {
      feedname
      id
    }
    active
    id
  }
}`
export const GET_FEED = gql`query Getfeed($querytype: String!, $feedname: String) {
  getfeed(querytype: $querytype, feedname: $feedname) {
    feedname
    description
    owner {
      avatar
      username
      id
    }
    subs {
      id
    }
    posts {
      headline
      description
      id
      img
      karma
      owner {
        username
        id
        avatar
      }
    }
    active
    id
  }
}`
export const GET_ALL_FEED = gql`query Getfeed($querytype: String!, $feedname: String) {
  getfeed(querytype: $querytype, feedname: $feedname) {
    feedname
    description
  }
}`
export const GET_POST = gql`query Getpost($getpostId: String!) {
  getpost(id: $getpostId) {
    headline
    description
    owner {
      username
      id
      avatar
    }
    karma
    img
    comments {
      user {
        username
        avatar
        id
      }
      content
      replies {
        content
        replies {
          content
          user {
            avatar
            id
            username
          }
        }
        user {
          username
          avatar
          id
        }
      }
    }
    id
  }
}`