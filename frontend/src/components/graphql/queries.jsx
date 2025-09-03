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
export const GET_FEED_POSTS = gql`
  query Getfeedposts(
    $feedname: String!
    $offset: Int!
    $limit: Int!
    $orderBy: String!
  ) {
    getfeedposts(
      feedname: $feedname
      offset: $offset
      limit: $limit
      orderBy: $orderBy
    ) {
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
        id
      }
      owner {
        username
        avatar
        id
        active
      }
    }
  }
`;
export const GET_POST_COMMENTS = gql`
  query Getpostcomments($postid: String!, $offset: Int!, $limit: Int!) {
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
        avatar
        id
      }
    }
  }
`;
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
      owner {
        id
        avatar
        username
      }
      feed {
        feedname
        id
      }
    }
  }
`;
export const GET_USER = gql`
  query Getuser($getuserId: String!) {
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
              feedsubs {
        id
      }
      posts {
        id
      }
      ownedfeeds {
        id
      }
      comments {
        id
      }
      createdAt
    }
}
  
`;

export const GET_ALL_FEED = gql`
  query Getfeed($querytype: String!, $feedname: String) {
    getfeed(querytype: $querytype, feedname: $feedname) {
      feedname
      description
    }
  }
`;

export const GET_COMMENTS = gql`
  query Getcomments($commentid: String!, $offset: Int!) {
    getcomments(commentid: $commentid, offset: $offset) {
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
export const GET_POPULAR_POSTS = gql`
  query Query($offset: Int!, $orderBy: String) {
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
  }
`;
export const GET_USER_COMMENTS = gql`
  query Getusercomments($userid: String!, $offset: Int!) {
    getusercomments(userid: $userid, offset: $offset) {
      content
      active
      karma
      depth
      createdAt
      updatedAt
      id
      replyto {
        id
        user {
          id
          username
          avatar
        }
        content
        active
        karma
        depth
        createdAt
        updatedAt
      }
      replies {
        id
      }
      post {
        id
        headline
        description
      }
    }
  }
`;
export const GET_USER_POSTS = gql`
  query Getuserposts($userid: String!, $offset: Int!) {
    getuserposts(userid: $userid, offset: $offset) {
      headline
      description
      karma
      img
      active
      createdAt
      updatedAt
      id
      owner {
        id
      }
      feed {
        feedname
        id
      }
    }
  }
`;
export const GET_USER_SUBS = gql`
  query Getusersubs($userid: String!, $offset: Int!) {
    getusersubs(userid: $userid, offset: $offset) {
      feedname
      description
      active
      createdAt
      id
    }
  }
`;
export const GET_USER_OWNEDFEEDS = gql`
  query Getuserownedfeeds($userid: String!, $offset: Int!) {
    getuserownedfeeds(userid: $userid, offset: $offset) {
      feedname
      description
      active
      createdAt
      id
    }
  }
`;
export const GET_SEARCH_BAR = gql`
  query Getsearchbar($searchby: String!) {
    getsearchbar(searchby: $searchby) {
      feedname
      description
      active
      createdAt
      updatedAt
      id
    }
  }
`;
export const GET_IMAGE_URLS = gql`
  query Query($userId: String!) {
    getFiles(userId: $userId)
  }
`;
export const GET_IMAGE_URL = gql`
  query Query($imageId: String!) {
    getImage(imageId: $imageId)
  }
`;
