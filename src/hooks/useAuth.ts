import { useState, Dispatch, SetStateAction } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import errorHandler from "@/helpers/errorHandler";

export interface AuthenticateProps {
  name: string;
  email: string;
  password: string;
  type: "login" | "register";
}

export type AuthenticateType = (param: AuthenticateProps) => void;

export interface AuthResult {
  isLoggingIn: boolean;
  setIsLoggingIn: Dispatch<SetStateAction<boolean>>;
  authenticate: AuthenticateType;
}

export const useAuth = (): AuthResult => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const authenticate: AuthenticateType = ({ name, email, password, type }) => {
    try {
      setIsLoggingIn(true);

      if (!email || !password) {
        throw new Error("Email address and password must be filled in.");
      }

      signIn("credentials", {
        name,
        email,
        password,
        callbackUrl: `http://localhost:3000/auth/${type}`,
      });

      setIsLoggingIn(false);
    } catch (err: any) {
      setIsLoggingIn(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  return {
    isLoggingIn,
    setIsLoggingIn,
    authenticate,
  };
};
