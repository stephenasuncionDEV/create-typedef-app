import type { ComponentDefaultProps } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Menu = {
  baseStyle: (props: ComponentDefaultProps) => ({
    list: {
      bgColor: mode("white", "rgb(46,40,76)")(props),
    },
  }),
};

export default Menu;
