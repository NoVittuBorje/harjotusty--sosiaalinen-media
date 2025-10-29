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
      nationality
      work
      userKarma
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
      feedavatar
      createdAt
      owner {
        username
        avatar
        id
        active
      }
      moderators {
        username
        avatar
        id
        active
      }
      subs {
        id
      }
      subsCount
    }
  }
`;
export const GET_FEED_POSTS = gql`
  query Getfeedposts($feedname: String!, $offset: Int!, $orderBy: String!) {
    getfeedposts(feedname: $feedname, offset: $offset, orderBy: $orderBy) {
      headline
      description
      karma
      img
      active
      locked
      commentsCount
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
  query Getpostcomments($postid: String!, $offset: Int!) {
    getpostcomments(postid: $postid, offset: $offset) {
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
export const GET_POST = gql`
  query Getpost($getpostId: String!) {
    getpost(id: $getpostId) {
      headline
      description
      karma
      img
      active
      locked
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
        feedavatar
        owner {
          id
        }
        moderators {
          id
        }
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
      userKarma
      relationship
      description
      nationality
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
      locked
      commentsCount
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
      locked
      commentsCount
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
      feedavatar
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
      feedavatar
      active
      createdAt
      id
    }
  }
`;
export const GET_SEARCH_BAR = gql`
  query Getsearchbar($searchby: String!) {
    getsearchbar(searchby: $searchby) {
      ... on Feed {
        feedname
        active
        id
      }
      ... on Post {
        headline
        karma
        active
        createdAt
        updatedAt
        id
      }
      ... on User {
        username
        avatar
        id
        active
      }
    }
  }
`;
export const GET_SEARCH_USERS = gql`
  query Getsearchusers($searchby: String) {
    getsearchusers(searchby: $searchby) {
      username
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
export const GET_FEED_SUBS_COUNT = gql`
  query Query($feedname: String!) {
    getSubsCount(feedname: $feedname)
  }
`;
