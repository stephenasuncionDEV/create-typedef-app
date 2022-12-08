import type {
  NextApiRequest,
  NextApiResponse,
  GetServerSidePropsContext,
} from "next";
import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { unstable_getServerSession, type Session } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

import prisma from "./db/client";

type CreateContextOptions = {
  session: Session | null;
};

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions(ctx.req as NextApiRequest, ctx.res as NextApiResponse),
  );
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await getServerAuthSession({ req, res });

  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
