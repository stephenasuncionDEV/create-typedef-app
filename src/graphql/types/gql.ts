/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  "\n  query GetUserByID($id: ID!) {\n    getUserByID(id: $id) {\n      id\n      name\n      email\n      emailVerified\n      image\n      password\n      accounts {\n        id\n        userId\n        type\n        provider\n        providerAccountId\n        refresh_token\n        access_token\n        expires_at\n        token_type\n        scope\n        id_token\n        session_state\n        createdAt\n        updatedAt\n      }\n      sessions {\n        id\n        sessionToken\n        userId\n        expires\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n":
    types.GetUserByIdDocument,
  "\n  query GetUserByEmail($email: String!) {\n    getUserByEmail(email: $email) {\n      id\n      name\n      email\n      emailVerified\n      image\n      password\n      accounts {\n        id\n        userId\n        type\n        provider\n        providerAccountId\n        refresh_token\n        access_token\n        expires_at\n        token_type\n        scope\n        id_token\n        session_state\n        createdAt\n        updatedAt\n      }\n      sessions {\n        id\n        sessionToken\n        userId\n        expires\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n":
    types.GetUserByEmailDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetUserByID($id: ID!) {\n    getUserByID(id: $id) {\n      id\n      name\n      email\n      emailVerified\n      image\n      password\n      accounts {\n        id\n        userId\n        type\n        provider\n        providerAccountId\n        refresh_token\n        access_token\n        expires_at\n        token_type\n        scope\n        id_token\n        session_state\n        createdAt\n        updatedAt\n      }\n      sessions {\n        id\n        sessionToken\n        userId\n        expires\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n",
): typeof documents["\n  query GetUserByID($id: ID!) {\n    getUserByID(id: $id) {\n      id\n      name\n      email\n      emailVerified\n      image\n      password\n      accounts {\n        id\n        userId\n        type\n        provider\n        providerAccountId\n        refresh_token\n        access_token\n        expires_at\n        token_type\n        scope\n        id_token\n        session_state\n        createdAt\n        updatedAt\n      }\n      sessions {\n        id\n        sessionToken\n        userId\n        expires\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetUserByEmail($email: String!) {\n    getUserByEmail(email: $email) {\n      id\n      name\n      email\n      emailVerified\n      image\n      password\n      accounts {\n        id\n        userId\n        type\n        provider\n        providerAccountId\n        refresh_token\n        access_token\n        expires_at\n        token_type\n        scope\n        id_token\n        session_state\n        createdAt\n        updatedAt\n      }\n      sessions {\n        id\n        sessionToken\n        userId\n        expires\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n",
): typeof documents["\n  query GetUserByEmail($email: String!) {\n    getUserByEmail(email: $email) {\n      id\n      name\n      email\n      emailVerified\n      image\n      password\n      accounts {\n        id\n        userId\n        type\n        provider\n        providerAccountId\n        refresh_token\n        access_token\n        expires_at\n        token_type\n        scope\n        id_token\n        session_state\n        createdAt\n        updatedAt\n      }\n      sessions {\n        id\n        sessionToken\n        userId\n        expires\n        createdAt\n        updatedAt\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 **/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
