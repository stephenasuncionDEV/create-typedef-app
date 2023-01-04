import type {
  ComponentStyleConfig,
  ComponentDefaultProps,
} from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Text: ComponentStyleConfig = {
  variants: {
    link: () => ({
      color: "blue.500",
      _hover: {
        color: "blue.600",
      },
    }),
    "subtle-link": (props: ComponentDefaultProps) => ({
      color: mode("blackAlpha.700", "whiteAlpha.500")(props),
      _hover: {
        color: mode("black", "white")(props),
      },
    }),
  },
};

export default Text;
