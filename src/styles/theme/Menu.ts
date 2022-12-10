import type { ComponentDefaultProps } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Menu = {
  baseStyle: (props: ComponentDefaultProps) => ({
    list: {
      bgColor: mode("white", "#05010D")(props),
      px: ".5em",
    },
    item: {
      bgColor: mode("white", "#05010D")(props),
      borderRadius: "5px",
      fontSize: "10pt",
      _hover: {
        bgColor: mode("gray.200", "whiteAlpha.200")(props),
      },
    },
  }),
};

export default Menu;
