import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export interface AuthResult {
  session: Session | null;
  isAuthenticated: boolean;
  isUnAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuthData = (): AuthResult => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isUnAuthenticated = status === "unauthenticated";
  const isLoading = status === "loading";

  return {
    session,
    isAuthenticated,
    isUnAuthenticated,
    isLoading,
  };
};
