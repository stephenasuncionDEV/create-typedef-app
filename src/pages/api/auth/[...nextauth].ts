/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextApiRequest, NextApiResponse } from "next";
import type { AdapterUser } from "next-auth/adapters";
import NextAuth, {
  type NextAuthOptions,
  type User,
  type Account,
  type Session,
} from "next-auth";
import {
  encode,
  decode,
  type JWTEncodeParams,
  type JWTDecodeParams,
  type JWT,
} from "next-auth/jwt";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import PrismaAdapter from "@/server/db/adapter";
import prisma from "@/server/db/client";
import { setCookie, getCookie } from "cookies-next";
import { createTransport } from "nodemailer";
import { v4 } from "uuid";
import { cookiePrefix, getUrl } from "@/common/utils";

export interface SignInCallback {
  user: User | AdapterUser;
  account: Account | null;
}

export interface SignOutEvent {
  session: Session | undefined;
  token: JWT | undefined;
}

export interface SessionCallback {
  session: Session;
  user: User | AdapterUser;
}

export const authOptions = (
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions => {
  return {
    providers: [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: parseInt(process.env.EMAIL_SERVER_PORT as string),
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
          secure: true,
          requireTLS: true,
          tls: {
            rejectUnauthorized: false,
          },
        },
        from: process.env.EMAIL_FROM,
        async sendVerificationRequest(params) {
          const { identifier, url, provider } = params;

          const transport = createTransport(provider.server);
          const result = await transport.sendMail({
            to: identifier,
            from: `${process.env.APP_NAME} ${provider.from}`,
            subject: `${process.env.APP_NAME} Login Verification`,
            text: `${process.env.APP_NAME} Login by navigating to this link: ${url}`,
            html: `
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"><table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
            <tr><td align="center">
          <table style="; border:1px solid #eaeaea;border-radius:5px;margin:40px 0;" width="600" border="0" cellspacing="0" cellpadding="40">
            <tr><td align="center"><div style="font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;text-align:left;width:465px;">

          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
            <tr><td align="center">
            <div><img src="${getUrl()}/assets/images/icon.png" width="40" height="40" alt="${
              process.env.APP_NAME
            }"></div>
            <h1 style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:24px;font-weight:normal;margin:30px 0;padding:0;">Proceed to login for <b>${
              process.env.APP_NAME
            }</b></h1>
          </td></tr>
          </table>

          <p style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:14px;line-height:24px;">To complete the signup process, please click on the button below. Please note that by completing your signup you are agreeing to our <a href="${getUrl()}/about/terms" target="_blank" style="color:#067df7;text-decoration:none;">Terms of Service</a> and <a href="${getUrl()}/about/privacy" target="_blank" style="color:#067df7;text-decoration:none;">Privacy Policy</a>:</p>
          <br>

          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
            <tr><td align="center">
          <div>
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:50px;width:200px;v-text-anchor:middle;" arcsize="10%" stroke="f" fillcolor="#000">
              <w:anchorlock/>
              <center>
            <![endif]-->
              <a href="${url}" target="_blank" style="background-color:#000;border-radius:5px;color:#fff;display:inline-block;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:12px;font-weight:500;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">VERIFY</a>
            <!--[if mso]>
              </center>
            </v:roundrect>
            <![endif]-->
          </div>
          </td></tr>
          </table>

          <br>
          <p style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:14px;line-height:24px;">Or copy and paste this URL into a new tab of your browser:</p>
          <p style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:14px;line-height:24px;"><a href="${url}" target="_blank" style="color:#067df7;text-decoration:none;">${url}</a></p>
          <br>
          <hr style="border:none;border-top:1px solid #eaeaea;margin:26px 0;width:100%;"><!-- </hr> -->
          <p style="color:#666666;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:12px;line-height:24px;">If you didn't attempt to sign up but received this email, or if the location doesn't match, please ignore
          this email. If you are concerned about your account's safety, please reply to this email to get in touch with us.</p>
          </div></td></tr>
          </table>
          </td></tr>
          </table>          
            `,
          });
          const failed = result.rejected.concat(result.pending).filter(Boolean);
          if (failed.length) {
            throw new Error(
              `Email(s) (${failed.join(", ")}) could not be sent`,
            );
          }
        },
      }),
      CredentialsProvider({
        id: "guest",
        name: "Guest",
        credentials: {
          guest: {
            label: "Guest",
            type: "text",
          },
        },
        async authorize(credentials, req) {
          if (!credentials || !req.headers) return null;

          const user = await prisma.user.create({
            data: {
              guestId: v4(),
              image: "https://ui-avatars.com/api/?name=U",
            },
          });

          return user;
        },
      }),
      CredentialsProvider({
        id: "web3",
        name: "Web3",
        credentials: {
          wallet: {
            label: "Wallet",
            type: "text",
          },
          address: {
            label: "Address",
            type: "text",
          },
        },
        async authorize(credentials, req) {
          if (!credentials || !req.headers) return null;

          const { wallet, address } = credentials;

          const user = await prisma.user.findFirst({
            where: {
              address,
            },
          });

          if (user) return user;

          const newUser = await prisma.user.create({
            data: {
              wallet,
              address,
              image: "https://ui-avatars.com/api/?name=U",
            },
          });

          return newUser;
        },
      }),
    ],
    pages: {
      signIn: "/auth",
      signOut: "/auth",
      error: `/auth`,
      verifyRequest: "/verify",
      newUser: "/dashboard",
    },
    session: {
      strategy: "database",
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60,
      generateSessionToken: () => {
        return v4();
      },
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
      async signIn({ user, account }: SignInCallback) {
        if (!user || !account) return false;

        if (
          req.method === "POST" &&
          (req.query.nextauth as string[]).includes("callback") &&
          ((req.query.nextauth as string[]).includes("guest") ||
            (req.query.nextauth as string[]).includes("web3"))
        ) {
          const sessionToken = v4();
          const sessionExpiry = new Date();
          sessionExpiry.setDate(sessionExpiry.getDate() + 30);

          await prisma.session.create({
            data: {
              sessionToken: sessionToken,
              userId: user.id,
              expires: sessionExpiry,
            },
          });

          setCookie(`${cookiePrefix}next-auth.session-token`, sessionToken, {
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
          session.user.role = user.role;
          session.user.address = user.address;
          session.user.guestId = user.guestId;
          session.user.wallet = user.wallet;
          session.user.points = user.points;
        }
        return session;
      },
      async redirect({ url, baseUrl }) {
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
    jwt: {
      async encode({ token, secret, maxAge }: JWTEncodeParams) {
        if (
          req.method === "POST" &&
          (req.query.nextauth as string[]).includes("callback") &&
          ((req.query.nextauth as string[]).includes("guest") ||
            (req.query.nextauth as string[]).includes("web3"))
        ) {
          const cookie = getCookie(`${cookiePrefix}next-auth.session-token`, {
            req,
            res,
          });

          if (cookie) return cookie as string;
          return "";
        }

        return await encode({ token, secret, maxAge });
      },
      async decode({ token, secret }: JWTDecodeParams) {
        if (
          req.method === "POST" &&
          (req.query.nextauth as string[]).includes("callback") &&
          ((req.query.nextauth as string[]).includes("guest") ||
            (req.query.nextauth as string[]).includes("web3"))
        ) {
          return null;
        }

        return await decode({ token, secret });
      },
    },
    events: {
      async signOut({ session }: SignOutEvent) {
        if (!session) return;

        const user = await prisma.user.findUnique({
          where: {
            id: session.userId,
          },
        });

        if (!user) return;

        if (user.wallet === "phantom" && window.solana) {
          window.solana.disconnect();
        }

        if (!user.guestId) return;

        await prisma.user.deleteMany({
          where: {
            id: session.userId,
            guestId: {
              not: null,
            },
          },
        });
      },
    },
    debug: false,
  };
};

export default function auth(
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions {
  const option = authOptions(req, res);
  return NextAuth(req, res, option);
}
