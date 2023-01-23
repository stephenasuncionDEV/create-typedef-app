import { useToast } from "@chakra-ui/react";

export const useCopy = () => {
  const toast = useToast({
    title: "Info",
    status: "info",
    duration: 3000,
    isClosable: true,
  });

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({ description: "Copied to clipboard" });
  };

  return copy;
};
