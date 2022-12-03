import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Account {
    id: ID
    userId: String
    type: String
    provider: String
    providerAccountId: String
    refresh_token: String
    access_token: String
    expires_at: Int
    token_type: String
    scope: String
    id_token: String
    session_state: String
    createdAt: String
    updatedAt: String
  }

  type Session {
    id: ID
    sessionToken: String
    userId: String
    expires: String
    createdAt: String
    updatedAt: String
  }

  type User {
    id: ID
    name: String
    email: String
    emailVerified: String
    image: String
    password: String
    accounts: [Account]
    sessions: [Session]
    createdAt: String
    updatedAt: String
  }

  # Queries
  type Query {
    getUserByID(id: ID!): User!
    getUserByEmail(email: String!): User!
  }
`;
