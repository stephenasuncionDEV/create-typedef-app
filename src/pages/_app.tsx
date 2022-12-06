import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CoreProvider } from "@/providers/CoreProvider";
import theme from "@/theme/index";
import "@/styles/globals.scss";
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <CoreProvider>
          <Component {...pageProps} />
        </CoreProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default MyApp;
