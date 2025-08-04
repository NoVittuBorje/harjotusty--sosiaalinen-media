import { gql } from "@apollo/client";

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
      dislikedposts {
        id
      }
      likedposts {
        id
      }
      likedcomments {
        id
      }
      dislikedcomments {
        id
      }
    }
  }
`;
export const GET_FEED = gql`
query Getfeed($querytype: String!, $feedname: String) {
  getfeed(querytype: $querytype, feedname: $feedname) {
    feedname
    description
    active
    id
    owner {
      username
      avatar
      id
      active
    }
    subs {
      id
    }
    posts {
      headline
      description
      karma
      img
      active
      createdAt
      updatedAt
      id
      owner {
        username
        avatar
        id
        active
      }
    }
  }
}
`;
export const GET_FEED_POSTS = gql`query Getfeedposts($feedname: String!, $offset: Int!, $limit: Int!) {
  getfeedposts(feedname: $feedname, offset: $offset, limit: $limit) {
    headline
    description
    karma
    img
    active
    createdAt
    updatedAt
    id
    owner {
        username
        avatar
        id
        active
      }
  }
}`
export const GET_POST_COMMENTS = gql`query Getpostcomments($postid: String!, $offset: Int!, $limit: Int!) {
  getpostcomments(postid: $postid, offset: $offset, limit: $limit) {
    content
    active
    karma
    depth
    createdAt
    updatedAt
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
}`
export const GET_POST_MIN = gql`
  query Getpost($getpostId: String!) {
    getpost(id: $getpostId) {
      headline
      description
      karma
      img
      active
      createdAt
      updatedAt
      id
  }
}
`;
export const GET_USER = gql`query Getuser($getuserId: String!) {
  getuser(id: $getuserId) {
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
    feedsubs {
      feedname
      description
      active
      id
    }
    posts {
      headline
      description
      karma
      img
      active
      createdAt
      updatedAt
      id
      owner {
        username
        avatar
        id
        active
      }
      feed {
        feedname
        description
        active
        id
      }
    }
    ownedfeeds {
      feedname
      description
      active
      id
    }
    comments {
      content
      active
      karma
      depth
      createdAt
      updatedAt
      id
      post {
        headline
        description
        karma
        img
        active
        createdAt
        updatedAt
        id
      }
      replyto {
        content
        active
        karma
        depth
        createdAt
        updatedAt
        id
      }
    }
  }
}`
export const GET_ALL_FEED = gql`
  query Getfeed($querytype: String!, $feedname: String) {
    getfeed(querytype: $querytype, feedname: $feedname) {
      feedname
      description
    }
  }
`;
export const GET_POST = gql`
  query Getpost($getpostId: String!) {
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
  }
`;
export const GET_COMMENTS = gql`
  query Getcomments($commentid: String!) {
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
      createdAt
      updatedAt
      id
      replies {
        content
        active
        karma
        depth
        id
        createdAt
        updatedAt
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
`;
export const GET_POPULAR_POSTS = gql`query Query($offset: Int!, $orderBy: String) {
  getpopularposts(offset: $offset, orderBy: $orderBy) {
    headline
    description
    karma
    img
    active
    createdAt
    updatedAt
    id
    feed {
      feedname
    }
    owner {
        username
        avatar
        id
        active
      }
  }
}`