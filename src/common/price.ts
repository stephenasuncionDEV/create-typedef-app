// https://www.coinbase.com/converter/sol/usd
export const getPriceFromPoints = (
  amount: number,
  currency: "usd" | "eth" | "sol" | "matic",
) => {
  const rate = {
    usd: 1,
    eth: 0.0008323864936967532,
    sol: 0.10005,
    matic: 1.3187392852433075,
  }[currency];
  return amount * rate;
};
