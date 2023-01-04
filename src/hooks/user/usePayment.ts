import type { User } from "@prisma/client";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "@/hooks/auth/useAuth";
import { trpc } from "@/server/trpc";
import { getMainnetFromWallet, getCurrencyFromMainnet } from "@/common/web3";
import { getPriceFromPoints } from "@/common/utils";
import errorHandler from "@/common/errorHandler";
import Web3 from "web3";

export const usePayment = () => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });
  const [amount, setAmount] = useState(25);
  const [isPaying, setIsPaying] = useState(false);
  const { ethereumLogin, verifyNetwork } = useAuth();

  const _addPoints = trpc.user.addPoints.useMutation();
  const _removePoints = trpc.user.removePoints.useMutation();
  const _addPayment = trpc.payment.addPayment.useMutation();
  const _user = trpc.user.getUser.useQuery();
  const payments = trpc.payment.getPayments.useQuery().data?.payments ?? [];

  const payWithCrypto = async (amount: number) => {
    try {
      setIsPaying(true);

      await ethereumLogin();

      await verifyNetwork();

      const mainnet = getMainnetFromWallet(_user.data?.wallet as WalletType);
      if (!mainnet) throw new Error("Wallet is not supported");

      let hash = "";
      let price = 25;

      if (mainnet === "ethereum") {
        if (
          typeof window.ethereum === "undefined" ||
          typeof window.web3 === "undefined"
        ) {
          throw new Error(
            "No Ethereum wallet detected. Please install Metamask or Coinbase Wallet",
          );
        }

        price = getPriceFromPoints(amount, "eth");

        const gasPrice = (await window.web3.eth.getGasPrice()) ?? 20000000000;

        const txHash = await window.web3.eth.sendTransaction({
          from:
            window.ethereum.selectedAddress ??
            window.web3.selectedAddress ??
            (_user.data as User).address,
          to: process.env.ETHEREUM_ADDRESS,
          value: Web3.utils.toWei(price.toFixed(6), "ether"),
          gas: 21000,
          gasPrice,
        });

        hash = txHash.blockHash;
      }

      await _addPoints.mutateAsync({ value: amount });

      const currency = getCurrencyFromMainnet(mainnet);

      await _addPayment.mutateAsync({
        amount,
        hash,
        price: `${price.toString()} ${currency}`,
        method: "crypto",
      });

      setIsPaying(false);

      toast({
        title: "Success",
        description: `Successfuly Purchased ${amount} Points`,
        status: "success",
      });
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setIsPaying(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const spendPoints = async (value: number) => {
    try {
      await _removePoints.mutateAsync({ value });

      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  return {
    isPaying,
    payWithCrypto,
    spendPoints,
    amount,
    setAmount,
    payments,
  };
};
