import type { FC } from "react";
import NextImage from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";

export interface WalletModalProps {
  isLoggingIn: boolean;
  isOpen: boolean;
  onClose: () => void;
  web3Login: (wallet: WalletType) => void;
}

export const walletArr = [
  { name: "Metamask", icon: "/assets/images/brands/metamask.png" },
  { name: "Coinbase", icon: "/assets/images/brands/coinbasewallet.png" },
];

const WalletModal: FC<WalletModalProps> = ({
  isLoggingIn,
  isOpen,
  onClose,
  web3Login,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Wallet Login
          <Text variant="subtle">
            Please select your crypto wallet to login.
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {walletArr?.map((wallet, idx) => (
              <Button
                key={idx}
                onClick={() =>
                  web3Login(wallet.name.toLowerCase() as WalletType)
                }
                w="full"
                gap=".5em"
                variant="outline"
                isDisabled={isLoggingIn}
                isLoading={isLoggingIn}
              >
                <NextImage
                  src={wallet.icon}
                  alt={wallet.name}
                  width={24}
                  height={24}
                />
                {wallet.name}
              </Button>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
