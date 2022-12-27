import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import errorHandler from "@/common/errorHandler";

export interface DefaultAuthForm {
  name?: string;
  email?: string;
  password?: string;
}

export interface AuthenticateProps extends DefaultAuthForm {
  type: "login" | "register";
}

export type AuthFormErrors = DefaultAuthForm;

export type AuthenticateType = (param: AuthenticateProps) => Promise<void>;
export type AuthenticateProviderType = (providerId: string) => Promise<void>;

export interface AuthFormResult {
  isLoggingIn: boolean;
  setIsLoggingIn: Dispatch<SetStateAction<boolean>>;
  authenticate: AuthenticateType;
  authenticateProvider: AuthenticateProviderType;
  errors: AuthFormErrors;
  setErrors: Dispatch<SetStateAction<AuthFormErrors>>;
}

export const useAuthForm = (): AuthFormResult => {
  const router = useRouter();
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errors, setErrors] = useState({} as AuthFormErrors);

  useEffect(() => {
    setErrors({} as AuthFormErrors);
  }, [router]);

  const authenticateProvider: AuthenticateProviderType = async (providerId) => {
    try {
      setIsLoggingIn(true);

      const resAuth = await signIn(providerId, {
        callbackUrl: "/dashboard",
      });

      if (resAuth?.error) throw new Error(resAuth?.error);

      setIsLoggingIn(false);

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setIsLoggingIn(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const authenticate: AuthenticateType = async ({
    name,
    email,
    password,
    type,
  }) => {
    try {
      setIsLoggingIn(true);

      if (type === "login") {
        if (!email || !password)
          throw new Error("Email and password must be filled in.");
      } else if (type === "register") {
        const newErrors = {} as AuthFormErrors;

        if (!name || name.length > 70)
          newErrors.name = "Must have a name between 1 and 70 characters";
        if (!email || email.length > 320)
          newErrors.email = "Email must be valid";
        if (
          !password ||
          password.length < 8 ||
          password.length > 320 ||
          !/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password) ||
          !/[A-Z]/.test(password)
        )
          newErrors.password =
            "Password must atleast have 8 characters, 1 special, and 1 capital.";

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      }

      const resAuth = await signIn("credentials", {
        name,
        email,
        password,
        redirect: false,
      });

      if (resAuth?.error) throw new Error(resAuth?.error);

      setIsLoggingIn(false);

      router.push("/dashboard");
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
    authenticateProvider,
    errors,
    setErrors,
  };
};
