import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useToast } from "@chakra-ui/react";

export interface ILoginProps {
  isLoggingIn: boolean;
  setIsLoggingIn: Dispatch<SetStateAction<boolean>>;
}

export const useLogin = (): ILoginProps => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!toast) return;
    toast({
      title: "Success",
      status: "success",
      description: "loaded",
    });
  }, [toast]);

  return {
    isLoggingIn,
    setIsLoggingIn,
  };
};
