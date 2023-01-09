import type { ComponentDefaultProps } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Modal = {
  baseStyle: (props: ComponentDefaultProps) => ({
    dialog: {
      bgColor: mode("white", "#05010D")(props),
      border: "1px solid rgba(255,255,255,.1)",
    },
    header: {
      fontWeight: "normal",
    },
  }),
};

export default Modal;
