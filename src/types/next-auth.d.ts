import type { DefaultSession } from "next-auth";
// import type { ClientSafeProvider } from "next-auth/react";

// declare module "next-auth/providers" {
//   type AvailableProviderType = "credentials";
// }

// declare module "next-auth/react" {
//   interface AvailableSafeProvider extends ClientSafeProvider {
//     id: "credentials";
//   }
// }

import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    userId?: string;
    user?: {
      id: string;
      role: string;
      points: number;
      address?: string | null;
      guestId?: string | null;
      wallet?: string | null;
    } & DefaultSession["user"];
  }
  interface DefaultUser {
    role: string;
    points: number;
    address?: string | null;
    guestId?: string | null;
    wallet?: string | null;
  }
}
