import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
