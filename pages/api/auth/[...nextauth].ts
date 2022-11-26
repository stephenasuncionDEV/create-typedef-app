import type { User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import { encrypt, decrypt } from "@/helpers/index";
import { encode, decode } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      async profile(profile, tokens) {
        return Promise.resolve({
          id: profile.id.toString(),
          name: profile.name,
          email: profile.email,
          image: `https://ui-avatars.com/api/?name=${profile.name!.replaceAll(
            " ",
            "+",
          )}`,
        });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      async profile(profile, tokens) {
        return Promise.resolve({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: `https://ui-avatars.com/api/?name=${profile.name!.replaceAll(
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
        email: { label: "Email", type: "email", placeholder: "Email address" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials || !req.headers) return null;

          const { name, email, password } = credentials;

          // const client = await clientPromise;
          // const db = client.db("create-typedef-template");
          // let user = await db.collection("users").findOne({ email });

          // if (req.headers.referer.indexOf("auth/login") !== -1) {
          //   if (user && decrypt(user.password) !== password) return null;
          // } else if (req.headers.referer.indexOf("auth/register") !== -1) {
          //   if (!user) {
          //     const newUser = await db.collection("users").insertOne({
          //       name,
          //       email,
          //       password: encrypt(password),
          //       image: `https://ui-avatars.com/api/?name=${name.replaceAll(
          //         " ",
          //         "+",
          //       )}`,
          //       emailVerified: null,
          //     });

          //     user = await db.collection("users").findOne({
          //       email,
          //     });

          //     await db.collection("accounts").insertOne({
          //       provider: "credentials",
          //       type: "credential",
          //       providerAcccountId: newUser.insertedId,
          //       userId: newUser.insertedId,
          //     });
          //   }
          // }

          //console.log(user);

          return null;
        } catch (err: any) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    signOut: "/",
  },
  callbacks: {
    async signIn({ user }: SignInCallback) {
      console.log("signIn", user);
      return true;
    },
    async session({ session, user }: SessionCallback) {
      if (session.user) {
        session.user.id = user.id;
      }
      console.log("session", session);
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  debug: true,
};

export interface SignInCallback {
  user: User | AdapterUser;
}

export interface SessionCallback {
  session: any;
  user: User | AdapterUser;
}

export default NextAuth(authOptions);
