import type {
  ComponentStyleConfig,
  ComponentDefaultProps,
} from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";

const Button: ComponentStyleConfig = {
  baseStyle: () => ({
    fontWeight: "normal",
  }),
  variants: {
    primary: () => ({
      bg: "rgb(117, 63, 229)",
      _hover: {
        bg: "rgb(142, 90, 250)",
        _disabled: {
          bg: "rgb(142, 90, 250)",
        },
      },
      color: "white",
    }),
    danger: () => ({
      bg: "rgb(229,62,62)",
      _hover: {
        bg: "red.400",
        _disabled: {
          bg: "red.400",
        },
      },
      color: "white",
    }),
    "outline-light": (props: ComponentDefaultProps) => ({
      bg: "whiteAlpha.200",
      border: mode(
        "1px solid rgba(0, 0, 0, 0.16)",
        "1px solid rgba(255, 255, 255, 0.16)",
      )(props),
      _hover: {
        bg: "whiteAlpha.300",
        _disabled: {
          opacity: 0.6,
        },
      },
      color: "white",
    }),
    transparent: (props: ComponentDefaultProps) => ({
      bg: "transparent",
      _hover: {
        color: mode("blackAlpha.500", "whiteAlpha.500")(props),
        _disabled: {
          color: mode("blackAlpha.500", "whiteAlpha.500")(props),
        },
      },
      color: mode("black", "white")(props),
    }),
    "transparent-subtle": (props: ComponentDefaultProps) => ({
      bg: "transparent",
      _hover: {
        color: mode("blackAlpha.700", "whiteAlpha.700")(props),
        _disabled: {
          color: mode("blackAlpha.400", "whiteAlpha.400")(props),
        },
      },
      color: mode("blackAlpha.500", "whiteAlpha.500")(props),
    }),
  },
};

export default Button;
