/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GraphQLHook {
  onCompleted: (data: any) => void;
  onError: (err: any) => void;
}
