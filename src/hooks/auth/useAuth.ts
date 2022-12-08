import type { Session } from "next-auth";
import { useSession } from "next-auth/react";

export interface AuthDataResult {
  session: Session | null;
  isAuthenticated: boolean;
  isUnAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = (): AuthDataResult => {
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
