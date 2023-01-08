import { useSession } from "next-auth/react";
import { getChainIdFromNetwork } from "@/common/web3";
import Web3 from "web3";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isUnAuthenticated = status === "unauthenticated";
  const isLoading = status === "loading";

  const web3ReAuthenticate = async (blockchain: Blockchain) => {
    if (!blockchain) throw new Error("blockchain is not found");

    let address = "";

    if (blockchain === "ethereum") {
      if (
        typeof window.ethereum === "undefined" ||
        typeof window.web3 === "undefined"
      ) {
        throw new Error(
          "No Ethereum wallet detected. Please install Metamask or Coinbase Wallet",
        );
      }

      let provider = window.ethereum || window.web3.currentProvider;

      /* eslint-disable-next-line   @typescript-eslint/no-explicit-any */
      const isMultipleProviders = (window.ethereum as any).providers;

      const wallet = session?.user?.wallet ?? undefined;

      if (wallet && isMultipleProviders) {
        /* eslint-disable-next-line   @typescript-eslint/no-explicit-any */
        provider = (window.ethereum as any).providers.find(
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

      /* eslint-disable-next-line   @typescript-eslint/no-explicit-any */
      window.web3 = new Web3(provider as any);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts.length) {
        throw new Error("No Ethereum accounts detected");
      }

      address = accounts[0];
    } else if (blockchain === "solana") {
      const isPhantomInstalled = window.phantom?.solana?.isPhantom;

      if (!isPhantomInstalled) {
        throw new Error(
          "No Solana wallet detected, you must install Phantom Wallet",
        );
      }

      const sol = (await window.solana?.connect()) as PhantomWallet | undefined;

      if (!sol) {
        throw new Error("Cannot connect with solana wallet");
      }

      address = sol.publicKey.toString();
    }

    if (!address) {
      throw new Error("No crypto wallet address detected");
    }

    return address;
  };

  const getChainId = () => {
    if (typeof window.ethereum === "undefined") return "solana";
    /* eslint-disable-next-line   @typescript-eslint/no-explicit-any */
    return `0x${parseInt((window.ethereum as any).networkVersion).toString(
      16,
    )}`;
  };

  const verifyNetwork = async (network?: Network) => {
    if (network === "solana") return;

    const id = getChainId();

    let chainId = process.env.CHAIN_ID ?? "0x1";
    if (network) {
      chainId = getChainIdFromNetwork(network);
    }

    if (id !== chainId) {
      try {
        if (!window.ethereum) throw new Error("No Ethereum wallet detected");

        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });

        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        if (err.code === 4902) {
          if (!window.ethereum) throw new Error("No Ethereum wallet detected");

          let networkData: NetworkData;

          if (chainId === "0x89") {
            networkData = {
              chainName: "Polygon Mainnet (Matic)",
              chainId,
              nativeCurrency: {
                name: "Polygon",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://polygon-rpc.com"],
              blockExplorerUrls: ["https://polygonscan.com"],
            };
          } else if (chainId === "0x13881") {
            networkData = {
              chainName: "Matic Mumbai Testnet",
              chainId: "0x13881",
              nativeCurrency: {
                name: "Matic",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://rpc-mumbai.matic.today"],
              blockExplorerUrls: ["https://mumbai.polygonscan.com"],
            };
          } else if (chainId === "0xfa") {
            networkData = {
              chainName: "Fantom Opera",
              chainId,
              nativeCurrency: {
                name: "Fantom",
                symbol: "FTM",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.ankr.com/fantom"],
              blockExplorerUrls: ["https://ftmscan.com"],
            };
          } else if (chainId === "0xfa2") {
            networkData = {
              chainName: "Fantom Testnet",
              chainId,
              nativeCurrency: {
                name: "Fantom",
                symbol: "FTM",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.testnet.fantom.network"],
              blockExplorerUrls: ["https://testnet.ftmscan.com/"],
            };
          } else if (chainId === "0xa86a") {
            networkData = {
              chainName: "Avalanche Network",
              chainId,
              nativeCurrency: {
                name: "Avalanche",
                symbol: "AVAX",
                decimals: 18,
              },
              rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
              blockExplorerUrls: ["https://snowtrace.io"],
            };
          } else if (chainId === "0xa869") {
            networkData = {
              chainName: "Avalanche Testnet C-Chain",
              chainId,
              nativeCurrency: {
                name: "Avalanche",
                symbol: "AVAX",
                decimals: 18,
              },
              rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
              blockExplorerUrls: ["https://testnet.snowtrace.io"],
            };
          } else if (chainId === "0xa") {
            networkData = {
              chainName: "Optimism",
              chainId,
              nativeCurrency: {
                name: "Optimism Ethereum",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://mainnet.optimism.io"],
              blockExplorerUrls: ["https://optimistic.etherscan.io"],
            };
          } else if (chainId === "0x1a4") {
            networkData = {
              chainName: "Optimism Goerli Testnet",
              chainId,
              nativeCurrency: {
                name: "Optimism Ethereum",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://goerli.optimism.io"],
              blockExplorerUrls: ["https://goerli-optimism.etherscan.io/"],
            };
          } else if (chainId === "0xa4b1") {
            networkData = {
              chainName: "Arbitrum One",
              chainId,
              nativeCurrency: {
                name: "Arbitrum Ethereum",
                symbol: "AETH",
                decimals: 18,
              },
              rpcUrls: ["https://arb1.arbitrum.io/rpc"],
              blockExplorerUrls: ["https://arbiscan.io"],
            };
          } else if (chainId === "0xa4b1") {
            networkData = {
              chainName: "Arbitrum One Goerli",
              chainId,
              nativeCurrency: {
                name: "Arbitrum Ethereum",
                symbol: "AGOR",
                decimals: 18,
              },
              rpcUrls: ["https://goerli.arbitrum.io/rpc"],
              blockExplorerUrls: ["https://goerli.arbiscan.io"],
            };
          } else if (chainId === "0x38") {
            networkData = {
              chainName: "Binance Smart Chain Mainnet",
              chainId,
              nativeCurrency: {
                name: "Binance Coin",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://bsc-dataseed.binance.org"],
              blockExplorerUrls: ["https://bscscan.com"],
            };
          } else if (chainId === "0x61") {
            networkData = {
              chainName: "Binance Smart Chain Testnet",
              chainId,
              nativeCurrency: {
                name: "Binance Coin",
                symbol: "TBNB",
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
              blockExplorerUrls: ["https://testnet.bscscan.com"],
            };
          }

          if (!networkData) {
            throw new Error(
              `Failed to get network data with chain id: ${chainId}`,
            );
          }

          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networkData],
          });
        }
      }
    }
  };

  return {
    session,
    isAuthenticated,
    isUnAuthenticated,
    isLoading,
    verifyNetwork,
    getChainId,
    web3ReAuthenticate,
  };
};
