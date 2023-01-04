/* eslint-disable  @typescript-eslint/no-explicit-any */
import "@chakra-ui/react";

declare global {
  type WalletType = "metamask" | "coinbase" | "phantom";
  type Mainnet = "ethereum";

  interface Window {
    ethereum?: any;
    web3?: {
      currentProvider: any;
      eth: any;
      selectedAddress?: string;
    };
  }
}
