/* eslint-disable @typescript-eslint/no-explicit-any */
import { trpc } from "@/server/trpc";
import { useToast } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import errorHandler from "@/common/errorHandler";

export interface UseUserRes {
  deleteUser: (id: string | undefined) => Promise<void>;
}

export const useUser = (): UseUserRes => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
  });
  const _DeleteUser = trpc.user.deleteUser.useMutation();

  const deleteUser = async (id: string | undefined) => {
    try {
      if (!id) throw new Error("Cannot delete user at the moment.");

      await _DeleteUser.mutateAsync({ id });
      await signOut();

      toast({
        title: "Success",
        status: "success",
        description: "Successfully deleted user.",
      });
    } catch (err: any) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  return {
    deleteUser,
  };
};
