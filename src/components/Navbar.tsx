import { FC } from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import {
  type ResponsiveValue,
  Text,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
  useMediaQuery,
  Link,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { FiArrowUpRight } from "@react-icons/all-files/fi/FiArrowUpRight";

export const navbarData: NavbarData = {
  centerMenu: [
    { name: "Features", link: "/#features" },
    { name: "Pricing", link: "/#pricing" },
    { name: "Company", link: "/#company" },
  ],
  rightMenu: [{ name: "Log In", link: "/auth" }],
};

export type NavbarMenu = {
  name: string;
  link: string;
  variant?:
    | ResponsiveValue<
        | "link"
        | (string & object)
        | "ghost"
        | "outline"
        | "solid"
        | "unstyled"
        | "transparent"
        | "primary"
        | "gradient"
        | "outline-light"
      >
    | undefined;
  isExternal?: boolean;
};

export interface NavbarData {
  centerMenu?: NavbarMenu[];
  rightMenu?: NavbarMenu[];
}

const NavbarMenu: FC<NavbarMenu> = ({
  link,
  name,
  variant = "transparent",
  isExternal = false,
}) => {
  if (isExternal) {
    return (
      <Link href={link} isExternal style={{ textDecoration: "none" }}>
        <Button
          variant={variant}
          size="sm"
          fontWeight="700"
          rightIcon={<FiArrowUpRight />}
        >
          {name}
        </Button>
      </Link>
    );
  }

  return (
    <NextLink href={link} passHref shallow>
      <Button variant={variant} size="sm" fontWeight="700">
        {name}
      </Button>
    </NextLink>
  );
};

const Navbar: FC = () => {
  const [isDesktop] = useMediaQuery("(min-width: 690px)");

  return (
    <Flex
      as="header"
      position="fixed"
      w="full"
      justifyContent="center"
      backdropFilter="auto"
      backdropBlur="xl"
      backdropSaturate="1.5"
      borderBottom="1px solid rgb(0,0,0,.1)"
      zIndex={2}
    >
      <Flex
        as="nav"
        maxW="1200px"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        pl="2em"
        pr={isDesktop ? "2em" : ".5em"}
        position="relative"
      >
        <NextLink href="/">
          <HStack alignItems="center" py="1em">
            <NextImage
              src="/assets/images/logo.png"
              alt={`${process.env.APP_NAME} Logo`}
              width={18}
              height={18}
            />
            <Text fontWeight="500">{process.env.APP_NAME}</Text>
          </HStack>
        </NextLink>
        {isDesktop ? (
          <>
            <HStack
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              spacing="1.5em"
            >
              {navbarData.centerMenu?.map((menu, idx) => (
                <NavbarMenu key={idx} {...menu} />
              ))}
            </HStack>
            <HStack>
              {navbarData.rightMenu?.map((menu, idx) => (
                <NavbarMenu key={idx} {...menu} />
              ))}
            </HStack>
          </>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Menu Options"
              icon={<GiHamburgerMenu />}
              variant="outline-light"
            />
            <MenuList>
              {navbarData.centerMenu?.map((menu, idx) => (
                <NextLink key={idx} href={menu.link}>
                  <MenuItem>{menu.name}</MenuItem>
                </NextLink>
              ))}
              <MenuDivider />
              {navbarData.rightMenu?.map((menu, idx) => (
                <NextLink key={idx} href={menu.link}>
                  <MenuItem>{menu.name}</MenuItem>
                </NextLink>
              ))}
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
