/* eslint-disable  @typescript-eslint/no-explicit-any */
import "@chakra-ui/react";

declare global {
  interface Window {
    ethereum?: any;
    web3?: {
      currentProvider: any;
      eth: any;
      selectedAddress?: string;
    };
    phantom?: {
      solana?: PhantomWallet;
    };
    solana?: PhantomWallet;
  }

  type WalletType = "metamask" | "coinbase" | "phantom";
  type Mainnet =
    | "ethereum"
    | "polygon"
    | "fantom"
    | "avalanche"
    | "optimism"
    | "arbitrum"
    | "binance"
    | "solana";
  type Testnet =
    | "goerli"
    | "mumbai"
    | "fantom-testnet"
    | "avalanche-fuji-testnet"
    | "optimism-goerli"
    | "arbitrum-goerli"
    | "binance-testnet"
    | "solana-devnet";
  type Network = Mainnet | Testnet;
  type NetworkData =
    | {
        chainName: string;
        chainId: string;
        nativeCurrency: {
          name: string;
          symbol: string;
          decimals: number;
        };
        rpcUrls: string[];
        blockExplorerUrls: string[];
      }
    | undefined;
  type Blockchain = "ethereum" | "solana";

  interface PhantomWallet extends EventEmitter<PhantomWalletEvents> {
    isPhantom?: boolean;
    publicKey: { toBytes(): Uint8Array; toString(): string };
    isConnected: boolean;
    signTransaction<T extends Transaction | VersionedTransaction>(
      transaction: T,
    ): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(
      transactions: T[],
    ): Promise<T[]>;
    signAndSendTransaction<T extends Transaction | VersionedTransaction>(
      transaction: T,
      options?: SendOptions,
    ): Promise<{ signature: TransactionSignature }>;
    signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
  }
}

interface PhantomWalletEvents {
  connect(...args: unknown[]): unknown;
  disconnect(...args: unknown[]): unknown;
  accountChanged(newPublicKey: PublicKey): unknown;
}
