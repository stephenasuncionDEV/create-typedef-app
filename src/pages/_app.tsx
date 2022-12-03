import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CoreProvider } from "@/providers/CoreProvider";
import theme from "@/theme/index";
import "@/styles/globals.scss";

export const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <CoreProvider>
            <Component {...pageProps} />
          </CoreProvider>
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default MyApp;
