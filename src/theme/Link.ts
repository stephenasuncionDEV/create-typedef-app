import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Text: ComponentStyleConfig = {
  variants: {
    link: () => ({
      color: "blue.500",
      _hover: {
        color: "blue.600",
      },
    }),
  },
};

export default Text;
