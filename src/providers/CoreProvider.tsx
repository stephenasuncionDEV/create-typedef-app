import { Props } from "@/interfaces/index";
import {
  useState,
  useContext,
  createContext,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

export interface ICoreContextProps {
  template: boolean;
  setTemplate: Dispatch<SetStateAction<boolean>>;
}

export const CoreContext = createContext<ICoreContextProps>(
  {} as ICoreContextProps,
);
export const useCore = () => useContext(CoreContext);

export const CoreProvider: FC<Props> = ({ children }) => {
  const [template, setTemplate] = useState<boolean>(false);

  return (
    <CoreContext.Provider
      value={{
        template,
        setTemplate,
      }}
    >
      {children}
    </CoreContext.Provider>
  );
};
