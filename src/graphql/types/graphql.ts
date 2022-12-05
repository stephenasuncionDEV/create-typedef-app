/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: "Account";
  access_token?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  expires_at?: Maybe<Scalars["Int"]>;
  id?: Maybe<Scalars["ID"]>;
  id_token?: Maybe<Scalars["String"]>;
  provider?: Maybe<Scalars["String"]>;
  providerAccountId?: Maybe<Scalars["String"]>;
  refresh_token?: Maybe<Scalars["String"]>;
  scope?: Maybe<Scalars["String"]>;
  session_state?: Maybe<Scalars["String"]>;
  token_type?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  getUserByEmail: User;
  getUserByID: User;
};

export type QueryGetUserByEmailArgs = {
  email: Scalars["String"];
};

export type QueryGetUserByIdArgs = {
  id: Scalars["ID"];
};

export type Session = {
  __typename?: "Session";
  createdAt?: Maybe<Scalars["String"]>;
  expires?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  sessionToken?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  accounts?: Maybe<Array<Maybe<Account>>>;
  createdAt?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  emailVerified?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  image?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  sessions?: Maybe<Array<Maybe<Session>>>;
  updatedAt?: Maybe<Scalars["String"]>;
};

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetUserByIdQuery = {
  __typename?: "Query";
  getUserByID: {
    __typename?: "User";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    emailVerified?: string | null;
    image?: string | null;
    password?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    accounts?: Array<{
      __typename?: "Account";
      id?: string | null;
      userId?: string | null;
      type?: string | null;
      provider?: string | null;
      providerAccountId?: string | null;
      refresh_token?: string | null;
      access_token?: string | null;
      expires_at?: number | null;
      token_type?: string | null;
      scope?: string | null;
      id_token?: string | null;
      session_state?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
    } | null> | null;
    sessions?: Array<{
      __typename?: "Session";
      id?: string | null;
      sessionToken?: string | null;
      userId?: string | null;
      expires?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
    } | null> | null;
  };
};

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars["String"];
}>;

export type GetUserByEmailQuery = {
  __typename?: "Query";
  getUserByEmail: {
    __typename?: "User";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    emailVerified?: string | null;
    image?: string | null;
    password?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    accounts?: Array<{
      __typename?: "Account";
      id?: string | null;
      userId?: string | null;
      type?: string | null;
      provider?: string | null;
      providerAccountId?: string | null;
      refresh_token?: string | null;
      access_token?: string | null;
      expires_at?: number | null;
      token_type?: string | null;
      scope?: string | null;
      id_token?: string | null;
      session_state?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
    } | null> | null;
    sessions?: Array<{
      __typename?: "Session";
      id?: string | null;
      sessionToken?: string | null;
      userId?: string | null;
      expires?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
    } | null> | null;
  };
};

export const GetUserByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUserByID" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUserByID" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "emailVerified" },
                },
                { kind: "Field", name: { kind: "Name", value: "image" } },
                { kind: "Field", name: { kind: "Name", value: "password" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "accounts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "provider" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "providerAccountId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "refresh_token" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "access_token" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "expires_at" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "token_type" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "scope" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id_token" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "session_state" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sessions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sessionToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "expires" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserByEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUserByEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUserByEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "emailVerified" },
                },
                { kind: "Field", name: { kind: "Name", value: "image" } },
                { kind: "Field", name: { kind: "Name", value: "password" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "accounts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "provider" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "providerAccountId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "refresh_token" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "access_token" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "expires_at" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "token_type" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "scope" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id_token" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "session_state" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sessions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sessionToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "expires" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
