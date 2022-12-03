import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserByID($id: ID!) {
    getUserByID(id: $id) {
      id
      name
      email
      emailVerified
      image
      password
      accounts {
        id
        userId
        type
        provider
        providerAccountId
        refresh_token
        access_token
        expires_at
        token_type
        scope
        id_token
        session_state
        createdAt
        updatedAt
      }
      sessions {
        id
        sessionToken
        userId
        expires
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      name
      email
      emailVerified
      image
      password
      accounts {
        id
        userId
        type
        provider
        providerAccountId
        refresh_token
        access_token
        expires_at
        token_type
        scope
        id_token
        session_state
        createdAt
        updatedAt
      }
      sessions {
        id
        sessionToken
        userId
        expires
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
