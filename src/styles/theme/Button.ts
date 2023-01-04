import type {
  ComponentStyleConfig,
  ComponentDefaultProps,
} from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";
import { getColor } from "@/common/utils";

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
    danger: (props: ComponentDefaultProps) => ({
      bg: "rgba(196,48,48,0.6)",
      border: mode(
        "1px solid rgba(0, 0, 0, 0.16)",
        "1px solid rgba(255, 255, 255, 0.16)",
      )(props),
      _hover: {
        bg: "red.500",
        _disabled: {
          bg: "red.500",
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
      _active: {
        bg: "whiteAlpha.200",
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
      _active: {
        color: mode("black", "white")(props),
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
      _active: {
        color: mode("blackAlpha.500", "whiteAlpha.500")(props),
      },
      color: mode("blackAlpha.500", "whiteAlpha.500")(props),
    }),
    gradient: (props: ComponentDefaultProps) => {
      const { theme, bg } = props;

      const bgColor = getColor(theme, bg, mode("white", "#06060E")(props));

      return {
        border: "1px solid transparent",
        bg: `linear-gradient(${bgColor}, ${bgColor}) padding-box, linear-gradient(135deg, #EA5137, #7E0CC0) border-box`,
        _hover: {
          color: "inherit",
          textShadow: "rgb(0 0 0 / 56%) 0px 3px 12px",
          boxShadow: "rgb(233 7 140 / 50%) 0px 1px 40px",
        },
      };
    },
  },
};

export default Button;
