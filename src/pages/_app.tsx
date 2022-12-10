import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { trpc } from "@/server/trpc";
import store from "@/store/index";
import theme from "@/styles/theme/index";
import "@/styles/globals.scss";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
