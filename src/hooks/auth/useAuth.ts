import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { getMainnetFromWallet } from "@/common/web3";
import errorHandler from "@/common/errorHandler";
import { useAuthForm } from "./useAuthForm";

export const useAuth = () => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isUnAuthenticated = status === "unauthenticated";
  const isLoading = status === "loading";
  const { ethereumLogin } = useAuthForm();

  const web3ReAuthenticate = async () => {
    try {
      if (!session?.user) return;

      const { wallet } = session.user;

      const mainnet = getMainnetFromWallet(wallet as WalletType);
      if (!mainnet) throw new Error("Wallet is not supported");

      let address = "";

      if (mainnet === "ethereum") {
        address = await ethereumLogin(wallet as WalletType);
      }

      if (!address) {
        throw new Error("No crypto wallet address detected");
      }

      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const getChainId = () => {
    if (typeof window.ethereum === "undefined") return "solana";
    return `0x${parseInt(window.ethereum.networkVersion).toString(16)}`;
  };

  const verifyNetwork = async () => {
    const id = getChainId();
    const chainId = process.env.CHAIN_ID;

    if (id !== chainId) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    }
  };

  return {
    session,
    isAuthenticated,
    isUnAuthenticated,
    isLoading,
    web3ReAuthenticate,
    verifyNetwork,
    getChainId,
  };
};
