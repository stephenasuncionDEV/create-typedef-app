import { ClientSafeProvider } from "next-auth/react";
import { type DefaultSession } from "next-auth";

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
    } & DefaultSession["user"];
  }
}
