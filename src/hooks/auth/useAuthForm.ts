import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "./useAuth";
import { getBlockchainFromWallet } from "@/common/web3";
import errorHandler from "@/common/errorHandler";

export type AuthFormErrors = {
  email?: string;
};

export interface AuthFormResult {
  isLoggingIn: boolean;
  setIsLoggingIn: Dispatch<SetStateAction<boolean>>;
  errors: AuthFormErrors;
  setErrors: Dispatch<SetStateAction<AuthFormErrors>>;
  emailLogin: (email: string) => void;
  guestLogin: () => void;
  web3Login: (wallet: WalletType) => void;
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: Dispatch<SetStateAction<boolean>>;
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
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [errors, setErrors] = useState({} as AuthFormErrors);
  const { web3ReAuthenticate } = useAuth();

  useEffect(() => {
    setErrors({} as AuthFormErrors);
  }, [router]);

  const emailLogin = async (email: string) => {
    try {
      setIsLoggingIn(true);

      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (!emailRegex.test(email)) {
        throw new Error("Email address is not valid");
      }

      const resAuth = await signIn("email", {
        email,
      });

      if (resAuth?.error) {
        throw new Error(resAuth?.error);
      }

      setIsLoggingIn(false);

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setIsLoggingIn(false);
      const msg = errorHandler(err);
      setErrors({ email: msg });
    }
  };

  const guestLogin = async () => {
    try {
      setIsLoggingIn(true);

      const resAuth = await signIn("guest");

      if (resAuth?.error) {
        throw new Error(resAuth?.error);
      }

      setIsLoggingIn(false);

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setIsLoggingIn(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const web3Login = async (wallet: WalletType) => {
    try {
      setIsLoggingIn(true);

      const blockchain = getBlockchainFromWallet(wallet);

      const address = await web3ReAuthenticate(blockchain);

      const resAuth = await signIn("web3", {
        wallet,
        address,
      });

      if (resAuth?.error) {
        throw new Error(resAuth?.error);
      }

      setIsLoggingIn(false);
      setIsWalletModalOpen(false);

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setIsLoggingIn(false);
      const msg = errorHandler(err);
      if (msg.startsWith("No Metamask wallet detected")) {
        window.open("https://metamask.io/", "_blank");
      } else if (msg.startsWith("No Coinbase wallet detected")) {
        window.open("https://www.coinbase.com/wallet", "_blank");
      } else if (msg.startsWith("No Solana wallet detected")) {
        window.open("https://phantom.app/", "_blank");
      }
      toast({ description: msg });
    }
  };

  return {
    isLoggingIn,
    setIsLoggingIn,
    errors,
    setErrors,
    emailLogin,
    guestLogin,
    web3Login,
    isWalletModalOpen,
    setIsWalletModalOpen,
  };
};
