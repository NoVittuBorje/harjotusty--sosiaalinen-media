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
export const GET_POST_MIN = gql`query Getpost($getpostId: String!) {
  getpost(id: $getpostId) {
    headline
    description
    karma
    img
    active
    id
    comments {
      content
      active
      karma
      depth
      id
      replies {
        id
      }
      user {
        username
        email
        firstname
        lastname
        avatar
        relationship
        description
        work
        active
        id
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
    id
    comments {
      user {
        username
        avatar
        id
      }
      karma
      depth
      content
      id
      replies {
        content
        karma
        depth
        id
        user {
          username
          avatar
          id
        }
        replies {
          karma
          depth
          content
          id
          user {
            username
            avatar
            id
          }
          replies {
            karma
            depth
            content
            id
            user {
              username
              avatar
              id
            }
            replies {
              karma
              depth
              content
              id
              user {
                username
                id
                avatar
              }
              replies {
                karma
                depth
                content
                id
                user {
                  username
                  avatar
                  id
                }
                replies {
                karma
                depth
                content
                id
                user {
                  username
                  avatar
                  id
                }
                replies {
                karma
                depth
                content
                id
                user {
                  username
                  avatar
                  id
                }
                replies {
                karma
                depth
                content
                id
                user {
                  username
                  avatar
                  id
                }
                replies {
                  id
                }
                }
                }
                }
              }

            }
          }
        }
      }
      
    }
  }
}`
export const GET_COMMENTS = gql`query Getcomments($commentid: String!) {
  getcomments(commentid: $commentid) {
    content
    user {
      username
      avatar
      id
    }
    active
    karma
    depth
    id
    replies {
      content
      active
      karma
      depth
      id
      user {
        username
        avatar
        id
      }
      replies {
        id
      }
    }
  }
}`