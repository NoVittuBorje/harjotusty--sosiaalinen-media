import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const REGISTER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;
export const MAKEFEED = gql`
  mutation Mutation($feedname: String!, $description: String!) {
    makeFeed(feedname: $feedname, description: $description) {
      feedname
    }
  }
`;

export const MAKEPOST = gql`
  mutation Mutation(
    $headline: String!
    $feedname: String!
    $img: String
    $description: String!
  ) {
    makePost(
      headline: $headline
      feedname: $feedname
      img: $img
      description: $description
    ) {
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
      email
      avatar
      id
    }
    feed {
      feedname
      description
      active
      createdAt
      updatedAt
      id
    }
    }
  }
`;

export const SUBSCRIBE = gql`
  mutation Mutation($feedname: String!, $type: String!) {
    subscribe(feedname: $feedname, type: $type) {
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
      }
      id
    }
  }
`;
export const MAKECOMMENT = gql`
  mutation Mutation($content: String!, $replyto: String, $postid: String!) {
    makeComment(content: $content, replyto: $replyto, postid: $postid) {
      content
      id
      post {
        id
      }
      replyto {
        id
        content
      }
      replies {
        content
        user {
          avatar
          id
          username
        }
      }
      user {
        avatar
        username
        id
      }
    }
  }
`;
export const EDITCOMMENT = gql`mutation ModifyComment($commentid: String!, $content: String!, $action: String!) {
  modifyComment(commentid: $commentid, content: $content, action: $action) {
    content
    active
    karma
    depth
    id
  }
}`
export const EDITPOST = gql`mutation ModifyPost($postid: String!, $action: String!, $content: String!) {
  modifyPost(postid: $postid, action: $action, content: $content) {
    headline
    description
    karma
    img
    active
    createdAt
    updatedAt
    id
  }
}`
export const SINGLEIMAGEUPLOAD = gql`mutation Mutation($input: SingleFileInput!) {
  singleUpload(input: $input)
}`
export const USEREDIT = gql`mutation Mutation($type: String!, $content: String!) {
  modifyUser(type: $type, content: $content) {
    username
    email
    firstname
    lastname
    avatar
    relationship
    description
    work
    nationality
    active
    createdAt
    id
  }
}`
export const LIKECOMMENT = gql`mutation LikeComment($likeCommentId: String!) {
  likeComment(id: $likeCommentId) {
    likedcomments {
      id
      karma
    }
    dislikedcomments {
      id
      karma
    }
  }
}`
export const DISLIKECOMMENT = gql`mutation DislikeComment($dislikeCommentId: String!) {
  dislikeComment(id: $dislikeCommentId) {
    dislikedcomments {
      id
      karma
    }
    likedcomments {
      id
      karma
    }
  }
}`
export const LIKEPOST = gql`mutation LikePost($likePostId: String!) {
  likePost(id: $likePostId) {
    likedposts {
      id
      karma
    }
    dislikedposts {
      karma
      id
    }
  }
}`
export const DISLIKEPOST = gql`mutation DislikePost($dislikePostId: String!) {
  dislikePost(id: $dislikePostId) {
    dislikedposts {
      id
      karma
    }
    likedposts {
      id
      karma
    }
  }
}`