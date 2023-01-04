import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useToast } from "@chakra-ui/react";
import { getMainnetFromWallet } from "@/common/web3";
import Web3 from "web3";
import errorHandler from "@/common/errorHandler";

export type AuthFormErrors = {
  email?: string;
};

export const useAuthForm = () => {
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

      const mainnet = getMainnetFromWallet(wallet);
      if (!mainnet) throw new Error("Wallet is not supported");

      let address = "";

      if (mainnet === "ethereum") {
        address = await ethereumLogin(wallet);
      }

      if (!address) {
        throw new Error("No crypto wallet address detected");
      }

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
      }
      toast({ description: msg });
    }
  };

  const ethereumLogin = async (wallet: WalletType): Promise<string> => {
    if (
      typeof window.ethereum === "undefined" ||
      typeof window.web3 === "undefined"
    ) {
      throw new Error(
        "No Ethereum wallet detected. Please install Metamask or Coinbase Wallet",
      );
    }

    let provider = window.ethereum || window.web3.currentProvider;

    const isMultipleProviders = window.ethereum.providers;

    if (isMultipleProviders) {
      provider = window.ethereum.providers.find(
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        (x: any) => x.isMetaMask || x.isCoinbaseWallet,
      );

      if (
        wallet === "metamask" &&
        provider.hasOwnProperty("isCoinbaseWallet")
      ) {
        throw new Error("Please use Coinbase Wallet");
      } else if (
        wallet === "coinbase" &&
        provider.hasOwnProperty("isMetaMask")
      ) {
        throw new Error("Please use MetaMask Wallet");
      }
    } else {
      if (provider.isMetaMask && wallet === "coinbase") {
        throw new Error(
          "No Coinbase wallet detected. Please use Metamask Wallet",
        );
      } else if (provider.isCoinbaseWallet && wallet === "metamask") {
        throw new Error(
          "No Metamask wallet detected. Please use Coinbase Wallet",
        );
      }
    }

    window.web3 = new Web3(provider);

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts.length) {
      throw new Error("No Ethereum accounts detected");
    }

    return accounts[0];
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
    ethereumLogin,
  };
};
