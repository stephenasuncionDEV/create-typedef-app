import type { RootState } from "@/store/index";
import { useState } from "react";
import { trpc } from "@/server/trpc";
import { useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { updateIsUserSettingsOpen } from "@/store/user";
import { signOut } from "next-auth/react";
import errorHandler from "@/common/errorHandler";

export interface UseUserSettingsReturn {
  isUserSettingsOpen: boolean;
  isSaving: boolean;
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  deleteUser: () => Promise<void>;
  toggleUserSettings: () => void;
  saveUser: () => Promise<void>;
}

export const useUserSettings = (): UseUserSettingsReturn => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
  });
  const isUserSettingsOpen = useSelector(
    (state: RootState) => state.user.isUserSettingsOpen,
  );
  const dispatch = useDispatch();

  const _deleteUser = trpc.user.deleteUser.useMutation();
  const _updateName = trpc.user.updateName.useMutation();
  const _updateEmail = trpc.user.updateEmail.useMutation();
  const _getUserForce = trpc.user.getUserForce.useMutation();

  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState("[enter your name]");
  const [email, setEmail] = useState("[enter your email]");

  const saveUser = async () => {
    try {
      const _user = await _getUserForce.mutateAsync();

      if (!_user) {
        throw new Error("Cannot save user at the moment.");
      }

      setIsSaving(true);

      if (name !== _user.name && name !== "[enter your name]") {
        await _updateName.mutateAsync({ name });
      }

      if (email !== _user.email && email !== "[enter your email]") {
        await _updateEmail.mutateAsync({ email });
      }

      setIsSaving(false);
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      setIsSaving(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const toggleUserSettings = () => {
    dispatch(updateIsUserSettingsOpen(!isUserSettingsOpen));
  };

  const deleteUser = async () => {
    try {
      await _deleteUser.mutateAsync();
      await signOut();

      toast({
        title: "Success",
        status: "success",
        description: "Successfully deleted user.",
      });
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  return {
    isSaving,
    isUserSettingsOpen,
    name,
    setName,
    email,
    setEmail,
    deleteUser,
    toggleUserSettings,
    saveUser,
  };
};
