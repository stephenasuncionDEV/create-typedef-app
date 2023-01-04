import type { Styles, GlobalStyleProps } from "@chakra-ui/theme-tools";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import Button from "./Button";
import Link from "./Link";
import Text from "./Text";
import Menu from "./Menu";
import Modal from "./Modal";

export type Fonts = {
  heading: string;
  body: string;
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const fonts: Fonts = {
  heading: "Inter, Poppins, sans-serif",
  body: "Inter, Poppins, sans-serif",
};

const styles: Styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      bg: mode("white", "#05010D")(props),
    },
  }),
};

const colors = {
  primary: "#753FE5",
};

const shadows = {
  white: "0 4px 14px 0 rgba(255,255,255,.1)",
  black: "0 4px 14px 0 rgba(0,0,0,.1)",
  purple: "0 4px 14px 0 rgba(117,63,229,.1)",
};

const theme = extendTheme({
  config,
  fonts,
  styles,
  colors,
  shadows,
  components: {
    Button,
    Link,
    Text,
    Menu,
    Modal,
  },
});

export default theme;
