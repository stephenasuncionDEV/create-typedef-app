import type { DefaultSession, DefaultUser } from "next-auth";
import { ClientSafeProvider } from "next-auth/react";

declare module "next-auth/providers" {
  type AvailableProviderType = "github" | "google" | "credentials";
}

declare module "next-auth/react" {
  interface AvailableSafeProvider extends ClientSafeProvider {
    id: "github" | "google" | "credentials";
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      isStaff?: boolean;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    isStaff?: boolean;
  }
}
