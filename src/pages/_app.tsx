import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { trpc } from "@/server/trpc";
import store from "@/store/index";
import theme from "@/styles/theme/index";
import posthog from "posthog-js";
import "@/styles/globals.scss";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!process.env.POSTHOG_TOKEN) return;

    posthog.init(process.env.POSTHOG_TOKEN, {
      api_host: "https://app.posthog.com",
    });

    const handleRouteChange = (page: string) => {
      posthog.capture("$pageview", {
        page,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line
  }, []);

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
