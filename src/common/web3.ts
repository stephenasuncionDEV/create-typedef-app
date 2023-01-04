export const getMainnetFromWallet = (wallet: WalletType): Mainnet => {
  switch (wallet) {
    case "metamask":
    case "coinbase":
      return "ethereum";
    default:
      return "ethereum";
  }
};

export const getCurrencyFromMainnet = (mainnet: Mainnet): string => {
  switch (mainnet) {
    case "ethereum":
      return "ETH";
    default:
      return "ethereum";
  }
};
