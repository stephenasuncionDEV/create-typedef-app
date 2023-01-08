import type { TransactionInstruction, PublicKey } from "@solana/web3.js";
import type { User } from "@prisma/client";
import { useState } from "react";
import {
  Transaction,
  Connection,
  clusterApiUrl,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "@/hooks/auth/useAuth";
import { trpc } from "@/server/trpc";
import { getBlockchainFromWallet, getCurrencyFromNetwork } from "@/common/web3";
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
  const { web3ReAuthenticate, verifyNetwork } = useAuth();

  const _addPoints = trpc.user.addPoints.useMutation();
  const _removePoints = trpc.user.removePoints.useMutation();
  const _addPayment = trpc.payment.addPayment.useMutation();
  const _user = trpc.user.getUser.useQuery();
  const payments = trpc.payment.getPayments.useQuery().data?.payments ?? [];

  const createTransactionSolana = async (
    connection: Connection,
    instructions: TransactionInstruction,
  ) => {
    if (!window.solana) throw new Error("Phantom is not installed");
    if (!window.solana.isPhantom) throw new Error("Phantom is not installed");

    const anyTransaction = new Transaction().add(instructions);
    anyTransaction.feePayer = window.solana.publicKey as PublicKey;
    anyTransaction.recentBlockhash = (
      await connection.getLatestBlockhash("finalized")
    ).blockhash;
    return anyTransaction;
  };

  const payWithCrypto = async (amount: number) => {
    try {
      setIsPaying(true);

      if (!_user.data) throw new Error("User not found 0x5");

      const blockchain = getBlockchainFromWallet(
        _user.data?.wallet as WalletType,
      );
      if (!blockchain) throw new Error("Wallet is not supported");

      await web3ReAuthenticate(blockchain);
      await verifyNetwork();

      let hash = "";
      let price = 25;

      if (blockchain === "ethereum") {
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
            /* eslint-disable-next-line   @typescript-eslint/no-explicit-any */
            (window.ethereum as any).selectedAddress ??
            window.web3.selectedAddress ??
            (_user.data as User).address,
          to: process.env.ETHEREUM_ADDRESS,
          value: Web3.utils.toWei(price.toFixed(6), "ether"),
          gas: 21000,
          gasPrice,
        });

        hash = txHash.blockHash;
      } else if (blockchain === "solana") {
        if (!window.solana) throw new Error("Phantom is not installed");

        price = getPriceFromPoints(amount, "sol");

        const connection = new Connection(
          process.env.SOLANA_RPC_URL ??
            clusterApiUrl(
              process.env.CHAIN_ID === "0x1" ? "mainnet-beta" : "devnet",
            ),
        );

        const { signature } = await window.solana.signAndSendTransaction(
          await createTransactionSolana(
            connection,
            SystemProgram.transfer({
              fromPubkey:
                (window.solana.publicKey as PublicKey) ??
                (_user.data as User).address,
              toPubkey: process.env.SOLANA_ADDRESS as unknown as PublicKey,
              lamports: LAMPORTS_PER_SOL * parseFloat(price.toFixed(6)),
            }),
          ),
        );

        await connection.confirmTransaction(signature);

        hash = signature;
      }

      await _addPoints.mutateAsync({ value: amount });

      const currency = getCurrencyFromNetwork(blockchain);

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
