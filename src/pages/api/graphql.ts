// https://github.com/apollo-server-integrations/apollo-server-integration-next/blob/main/src/startServerAndCreateNextHandler.ts
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === "development",
});

export default startServerAndCreateNextHandler(server);
