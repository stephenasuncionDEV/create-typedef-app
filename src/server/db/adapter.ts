/** @return { import("next-auth/adapters").Adapter } */
import type { PrismaClient, Prisma } from "@prisma/client";
import type {
  Adapter,
  AdapterAccount,
  AdapterUser,
  AdapterSession,
} from "next-auth/adapters";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default function PrismaAdapter(p: PrismaClient, options = {}): Adapter {
  return {
    async createUser(data) {
      return (await p.user.create({ data })) as AdapterUser;
    },
    async getUser(id) {
      return (await p.user.findUnique({ where: { id } })) as AdapterUser;
    },
    async getUserByEmail(email) {
      return (await p.user.findUnique({ where: { email } })) as AdapterUser;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await p.account.findFirst({
        where: {
          providerAccountId,
          provider,
        },
        select: { user: true },
      });
      return (account?.user ?? null) as AdapterUser;
    },
    async updateUser({ id, ...data }) {
      return (await p.user.update({ where: { id }, data })) as AdapterUser;
    },
    async deleteUser(id) {
      return (await p.user.delete({ where: { id } })) as AdapterUser;
    },
    async linkAccount(data) {
      return (await p.account.create({ data })) as unknown as AdapterAccount;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return (await p.account.deleteMany({
        where: {
          providerAccountId,
          provider,
        },
      })) as unknown as AdapterAccount;
    },
    async createSession(data) {
      return await p.session.create({ data });
    },
    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session } as {
        session: AdapterSession;
        user: AdapterUser;
      } | null;
    },
    async updateSession(data) {
      return await p.session.update({
        where: { sessionToken: data.sessionToken },
        data,
      });
    },
    async deleteSession(sessionToken) {
      const session = await p.session
        .delete({ where: { sessionToken } })
        .catch();
      return session;
    },
    async createVerificationToken(data) {
      const verificationToken = await p.verificationToken.create({ data });
      return verificationToken;
    },
    async useVerificationToken({ token }) {
      try {
        const verificationToken = await p.verificationToken.delete({
          where: { token },
        });
        return verificationToken;
      } catch (error) {
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025") {
          return null;
        }
        throw error;
      }
    },
  };
}
