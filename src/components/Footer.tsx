import NextImage from "next/image";
import NextLink from "next/link";
import {
  Center,
  Link,
  HStack,
  Text,
  IconButton,
  VStack,
  Wrap,
  WrapItem,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";

export type FooterDirectory = {
  name: string;
  link: string;
  icon?: JSX.Element;
  isExternal?: boolean;
};

export type FooterDirectories = {
  header: string;
  items: FooterDirectory[];
};

export interface FooterData {
  company: string;
  logo: string;
  socials?: FooterDirectory[];
  directories?: FooterDirectories[];
}

export const footerData: FooterData = {
  company: "Typedef - Better Experience",
  logo: "/assets/images/logo-white.svg",
  socials: [
    {
      name: "Twitter",
      link: "https://twitter.com/Steb_01",
      icon: <FaTwitter />,
    },
    {
      name: "GitHub",
      link: "https://github.com/stephenasuncionDEV",
      icon: <FaGithub />,
    },
    {
      name: "Youtube",
      link: "https://www.youtube.com/@StephenAsuncion",
      icon: <FaYoutube />,
    },
  ],
  directories: [
    {
      header: "Product",
      items: [
        { name: "Features", link: "/#features" },
        { name: "Pricing", link: "/#pricing" },
        { name: "Changelog", link: "/#changelog" },
        { name: "Docs", link: "/#docs" },
      ],
    },
    {
      header: "Company",
      items: [
        { name: "About us", link: "/#aboutus" },
        { name: "Blog", link: "/#blog" },
        { name: "Careers", link: "/#careeers" },
        { name: "Customers", link: "/#" },
        { name: "Brand", link: "/" },
      ],
    },
    {
      header: "Resources",
      items: [
        { name: "Community", link: "/" },
        { name: "Contact", link: "/" },
        { name: "Terms of Service", link: "/about/terms" },
        { name: "Privacy Policy", link: "/about/privacy" },
      ],
    },
    {
      header: "Developers",
      items: [
        { name: "API", link: "/" },
        { name: "Status", link: "/" },
        { name: "GitHub", link: "/" },
      ],
    },
  ],
};

const Footer = () => {
  const [isCollapse] = useMediaQuery("(max-width: 966px)");

  return (
    <Center as="footer" borderTop="1px solid rgb(255,255,255,.1)">
      <Wrap
        className="footer-wrap"
        maxW="1200px"
        w="full"
        minH="405px"
        p="2em"
        py="3.5em"
        sx={{
          "& > ul": {
            justifyContent: isCollapse ? "center" : "space-between",
          },
        }}
        spacing="3em"
      >
        <WrapItem
          justifyContent="space-between"
          flexDir="column"
          alignItems={isCollapse ? "center" : "initial"}
        >
          <NextLink href="/">
            <HStack alignItems="center">
              <NextImage
                src={footerData.logo}
                alt="Logo"
                width={18}
                height={18}
              />
              <Text fontSize="10pt" color="whiteAlpha.500" textAlign="center">
                {footerData.company}
              </Text>
            </HStack>
          </NextLink>
          <HStack spacing=".75em">
            {footerData.socials?.map((social, idx) => (
              <Link key={idx} href={social.link} isExternal>
                <IconButton
                  aria-label={social.name}
                  variant="transparent-subtle"
                >
                  {social.icon}
                </IconButton>
              </Link>
            ))}
          </HStack>
        </WrapItem>
        <Wrap spacing="6em" justify={isCollapse ? "center" : "initial"}>
          {footerData.directories?.map((dir, idx) => (
            <WrapItem key={idx}>
              <VStack alignItems="flex-start" spacing="1em" fontSize="11pt">
                <Text>{dir.header}</Text>
                {dir.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    color="whiteAlpha.500"
                    style={{ textDecoration: "none" }}
                    _hover={{
                      color: "white",
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </VStack>
            </WrapItem>
          ))}
        </Wrap>
      </Wrap>
    </Center>
  );
};

export default Footer;
