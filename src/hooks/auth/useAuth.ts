import { useSession } from "next-auth/react";
import Web3 from "web3";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isUnAuthenticated = status === "unauthenticated";
  const isLoading = status === "loading";

  const ethereumLogin = async (wallet = "metamask"): Promise<string> => {
    if (
      typeof window.ethereum === "undefined" ||
      typeof window.web3 === "undefined"
    ) {
      throw new Error(
        "No Ethereum wallet detected. Please install Metamask or Coinbase Wallet",
      );
    }

    const cWallet = session?.user?.wallet ?? wallet;

    let provider = window.ethereum || window.web3.currentProvider;

    const isMultipleProviders = window.ethereum.providers;

    if (isMultipleProviders) {
      provider = window.ethereum.providers.find(
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        (x: any) => x.isMetaMask || x.isCoinbaseWallet,
      );

      if (
        cWallet === "metamask" &&
        provider.hasOwnProperty("isCoinbaseWallet")
      ) {
        throw new Error("Please use Coinbase Wallet");
      } else if (
        cWallet === "coinbase" &&
        provider.hasOwnProperty("isMetaMask")
      ) {
        throw new Error("Please use MetaMask Wallet");
      }
    } else {
      if (provider.isMetaMask && cWallet === "coinbase") {
        throw new Error(
          "No Coinbase wallet detected. Please use Metamask Wallet",
        );
      } else if (provider.isCoinbaseWallet && cWallet === "metamask") {
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
    verifyNetwork,
    getChainId,
    ethereumLogin,
  };
};
