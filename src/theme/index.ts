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
      bg: mode("white", "rgb(5,1,13)")(props),
    },
  }),
};

const theme = extendTheme({
  config,
  fonts,
  styles,
  components: {
    Button,
    Link,
    Text,
    Menu,
    Modal,
  },
});

export default theme;
