import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/server/trpc/routers/_app";
import { createContext } from "@/server/trpc/context";

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`[tRPC] failed on ${path}: ${error}`);
        }
      : undefined,
});
