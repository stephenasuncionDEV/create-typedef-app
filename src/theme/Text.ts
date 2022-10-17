import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Text: ComponentStyleConfig = {
  variants: {
    subtle: () => ({
      color: "gray.500",
      fontSize: "9pt",
    }),
  },
};

export default Text;
