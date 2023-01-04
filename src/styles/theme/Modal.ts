import type { ComponentDefaultProps } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Modal = {
  baseStyle: (props: ComponentDefaultProps) => ({
    dialog: {
      bgColor: mode("white", "#05010D")(props),
    },
    header: {
      fontWeight: "normal",
    },
  }),
};

export default Modal;
