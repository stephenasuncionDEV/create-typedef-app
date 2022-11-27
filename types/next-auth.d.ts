import { LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

declare module "next-auth/providers" {
  type AvailableProviderType = "github" | "google" | "credentials";
}

declare module "next-auth/react" {
  interface AvailableSafeProvider extends ClientSafeProvider {
    id: "github" | "google" | "credentials";
  }
}
