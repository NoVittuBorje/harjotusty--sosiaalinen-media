import { gql } from '@apollo/client'

export const LOGIN = gql`mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}`
export const REGISTER = gql`mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    username
    email
  }
}`
export const MAKEFEED = gql`mutation Mutation($feedname: String!, $description: String!) {
  makeFeed(feedname: $feedname, description: $description) {
    feedname
  }
}`

export const MAKEPOST = gql`mutation Mutation($headline: String!, $feedname: String!, $img: String, $description: String!) {
  makePost(headline: $headline, feedname: $feedname, img: $img, description: $description) {
    headline
    description
    owner {
      username
    }
    karma
    img
  }
}`

export const SUBSCRIBE = gql`mutation Mutation($feedname: String!, $type: String!) {
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
    ownedfeeds{
      feedname
    }
    id
  }
}`
export const MAKECOMMENT = gql`mutation Mutation($content: String!, $replyto: String, $postid: String!) {
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
}`