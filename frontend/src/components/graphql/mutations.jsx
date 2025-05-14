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