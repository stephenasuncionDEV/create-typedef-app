export const getBlockchainFromWallet = (wallet: WalletType): Blockchain => {
  switch (wallet) {
    case "metamask":
    case "coinbase":
      return "ethereum";
    case "phantom":
      return "solana";
    default:
      return "ethereum";
  }
};

export const getCurrencyFromNetwork = (network: Network): string => {
  switch (network) {
    case "ethereum":
    case "optimism":
    case "optimism-goerli":
    case "arbitrum":
      return "ETH";
    case "polygon":
    case "mumbai":
      return "MATIC";
    case "fantom":
    case "fantom-testnet":
      return "FTM";
    case "avalanche":
    case "avalanche-fuji-testnet":
      return "AVAX";
    case "arbitrum-goerli":
      return "AGOR";
    case "binance":
      return "BNB";
    case "binance-testnet":
      return "TBNB";
    case "goerli":
      return "GOR";
    case "solana":
    case "solana-devnet":
      return "SOL";
    default:
      return "ETH";
  }
};

export const getBlockchainFromNetwork = (network: Network): Blockchain => {
  switch (network) {
    case "ethereum":
    case "goerli":
    case "polygon":
    case "mumbai":
    case "fantom":
    case "fantom-testnet":
    case "avalanche":
    case "avalanche-fuji-testnet":
    case "optimism":
    case "optimism-goerli":
    case "arbitrum":
    case "arbitrum-goerli":
    case "binance":
    case "binance-testnet":
      return "ethereum";
    case "solana":
    case "solana-devnet":
      return "solana";
    default:
      return "ethereum";
  }
};

export const getMainnetFromNetwork = (network: Network): Mainnet => {
  switch (network) {
    case "ethereum":
    case "goerli":
      return "ethereum";
    case "polygon":
    case "mumbai":
      return "polygon";
    case "fantom":
    case "fantom-testnet":
      return "fantom";
    case "avalanche":
    case "avalanche-fuji-testnet":
      return "avalanche";
    case "optimism":
    case "optimism-goerli":
      return "optimism";
    case "arbitrum":
    case "arbitrum-goerli":
      return "arbitrum";
    case "binance":
    case "binance-testnet":
      return "binance";
    case "solana":
    case "solana-devnet":
      return "solana";
    default:
      return "ethereum";
  }
};

export const getChainIdFromNetwork = (network: Network): string => {
  switch (network) {
    case "ethereum":
      return "0x1";
    case "goerli":
      return "0x5";
    case "polygon":
      return "0x89";
    case "mumbai":
      return "0x13881";
    case "fantom":
      return "0xfa";
    case "fantom-testnet":
      return "0xfa2";
    case "avalanche":
      return "0xa86a";
    case "avalanche-fuji-testnet":
      return "0xa869";
    case "optimism":
      return "0xa";
    case "optimism-goerli":
      return "0x1a4";
    case "arbitrum":
      return "0xa4b1";
    case "arbitrum-goerli":
      return "0x66eed";
    case "binance":
      return "0x38";
    case "binance-testnet":
      return "0x61";
    case "solana":
    case "solana-devnet":
      return "0xsolana";
    default:
      return "0x1";
  }
};
