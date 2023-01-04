import type {
  ComponentStyleConfig,
  ComponentDefaultProps,
} from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Text: ComponentStyleConfig = {
  variants: {
    subtle: (props: ComponentDefaultProps) => ({
      color: mode("blackAlpha.800", "gray.500")(props),
      fontSize: "10pt",
    }),
  },
};

export default Text;
