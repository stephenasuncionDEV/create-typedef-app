/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions, User, Account } from "next-auth";
import type { JWTEncodeParams, JWTDecodeParams } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";
import NextAuth from "next-auth";
import { encode, decode } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import PrismaAdapter from "@/lib/prismaAdapter";
import prisma from "@/lib/prismaDb";
import { encrypt, decrypt } from "@/helpers/index";
import { setCookie, getCookie } from "cookies-next";
import { randomUUID } from "crypto";
import { uuid } from "uuidv4";

export interface SignInCallback {
  user: User | AdapterUser;
  account: Account | null;
}

export interface SessionCallback {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  session: any;
  user: User | AdapterUser;
}

export default function auth(
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions {
  const isLogin = req.body.callbackUrl?.includes("login") ?? false;

  return NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
        async profile(profile) {
          return Promise.resolve({
            id: profile.id.toString(),
            name: profile.name,
            email: profile.email,
            image: `https://ui-avatars.com/api/?name=${profile.name.replaceAll(
              " ",
              "+",
            )}`,
          });
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        async profile(profile) {
          return Promise.resolve({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: `https://ui-avatars.com/api/?name=${profile.name.replaceAll(
              " ",
              "+",
            )}`,
          });
        },
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          name: { label: "Name", type: "name", placeholder: "Name" },
          email: {
            label: "Email",
            type: "email",
            placeholder: "Email address",
          },
          password: {
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
        },
        async authorize(credentials, req) {
          if (!credentials || !req.headers) return null;

          const { name, email, password } = credentials;

          let user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (req.headers.referer.indexOf("auth/login") !== -1) {
            if (!user)
              throw new Error("User with that email address does not exist.");
            if (decrypt(user.password as string) !== password)
              throw new Error("Invalid email or password.");
          } else if (req.headers.referer.indexOf("auth/register") !== -1) {
            if (user) throw new Error("Email was already used.");

            user = await prisma.user.create({
              data: {
                name,
                email,
                image: `https://ui-avatars.com/api/?name=${name.replaceAll(
                  " ",
                  "+",
                )}`,
                password: encrypt(password),
                emailVerified: null,
              },
            });

            await prisma.account.create({
              data: {
                provider: "credentials",
                type: "credential",
                providerAccountId: user.id,
                userId: user.id,
              },
            });
          }

          return user;
        },
      }),
    ],
    pages: {
      signIn: "/auth/login",
      signOut: "/auth/login",
      error: `/auth/${isLogin ? "login" : "register"}`,
      verifyRequest: "/",
      newUser: "/",
    },
    session: {
      strategy: "database",
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
      generateSessionToken: () => {
        return randomUUID() ?? uuid();
      },
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
      async signIn({ user, account }: SignInCallback) {
        if (!user || !account) return false;

        if (
          (req.query.nextauth as string[]).includes("callback") &&
          (req.query.nextauth as string[]).includes("credentials") &&
          req.method === "POST" &&
          user
        ) {
          const sessionToken = randomUUID() ?? uuid();

          const sessionExpiry = new Date();
          sessionExpiry.setDate(sessionExpiry.getDate() + 30);

          await PrismaAdapter(prisma).createSession({
            sessionToken: sessionToken,
            userId: user.id,
            expires: sessionExpiry,
          });

          setCookie("next-auth.session-token", sessionToken, {
            req,
            res,
            expires: sessionExpiry,
          });
        }

        return true;
      },
      async session({ session, user }: SessionCallback) {
        if (session.user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
    jwt: {
      async encode({ token, secret, maxAge }: JWTEncodeParams) {
        if (
          (req.query.nextauth as string[]).includes("callback") &&
          (req.query.nextauth as string[]).includes("credentials") &&
          req.method === "POST"
        ) {
          const cookie = getCookie("next-auth.session-token", { req, res });

          if (cookie) return cookie as string;
          return "";
        }

        return await encode({ token, secret, maxAge });
      },
      async decode({ token, secret }: JWTDecodeParams) {
        if (
          (req.query.nextauth as string[]).includes("callback") &&
          (req.query.nextauth as string[]).includes("credentials") &&
          req.method === "POST"
        ) {
          return null;
        }

        return await decode({ token, secret });
      },
    },
    debug: true,
  });
}
