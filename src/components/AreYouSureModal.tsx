import { type FC, useRef, MutableRefObject } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineWarning } from "@react-icons/all-files/ai/AiOutlineWarning";

export interface AreYouSureModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: string;
  description: string;
  callback: () => Promise<void>;
}

const AreYouSureModal: FC<AreYouSureModalProps> = ({
  isOpen,
  onClose,
  action,
  description,
  callback,
}) => {
  const cancelRef = useRef() as MutableRefObject<HTMLButtonElement>;

  const onOkay = async () => {
    await callback();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Are you sure!</AlertDialogHeader>
        <AlertDialogBody>
          <VStack p="1em" px="2em">
            <AiOutlineWarning fontSize="28pt" />
            <Text fontSize="10pt">
              This action cannot be undone. Click {action} if you want to{" "}
              {description}.
            </Text>
          </VStack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <HStack>
            <Button
              ref={cancelRef}
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={onOkay}>
              {action}
            </Button>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AreYouSureModal;
