/* eslint-disable  @typescript-eslint/no-explicit-any */
import "@chakra-ui/react";

declare module "@chakra-ui/react" {
  interface ButtonOptions {
    gradient?: {
      base: string;
      from: string;
      to: string;
      direction: string;
    };
  }
}

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
