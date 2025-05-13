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
