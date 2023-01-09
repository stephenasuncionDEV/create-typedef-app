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
  logo: "/assets/images/logo.png",
  socials: [
    {
      name: "Twitter",
      link: "https://twitter.com/Steb_01",
      icon: <FaTwitter />,
    },
    {
      name: "GitHub",
      link: "https://github.com/stephenasuncionDEV/create-typedef-app",
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
      ],
    },
    {
      header: "Company",
      items: [
        {
          name: "About us",
          link: "https://stephenasuncion.dev/",
          isExternal: true,
        },
        {
          name: "Blog",
          link: "https://stephenasuncion.dev/",
          isExternal: true,
        },
        {
          name: "Careers",
          link: "https://stephenasuncion.dev/",
          isExternal: true,
        },
      ],
    },
    {
      header: "Resources",
      items: [
        {
          name: "Community",
          link: "https://twitter.com/Steb_01",
          isExternal: true,
        },
        {
          name: "Contact",
          link: "https://twitter.com/Steb_01",
          isExternal: true,
        },
        { name: "Terms of Service", link: "/about/terms" },
        { name: "Privacy Policy", link: "/about/privacy" },
      ],
    },
    {
      header: "Developers",
      items: [
        {
          name: "GitHub",
          link: "https://github.com/stephenasuncionDEV/hey-jarvis",
          isExternal: true,
        },
        {
          name: "Docs",
          link: "https://github.com/stephenasuncionDEV/hey-jarvis/blob/main/README.md",
          isExternal: true,
        },
      ],
    },
  ],
};

const Footer = () => {
  const [isCollapse] = useMediaQuery("(max-width: 966px)");

  return (
    <Center as="footer" borderTop="1px solid rgb(0,0,0,.1)">
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
                alt={`${process.env.APP_NAME} Logo`}
                width={18}
                height={18}
              />
              <Text fontSize="10pt" variant="subtle" textAlign="center">
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
                  <div key={idx}>
                    {item.isExternal ? (
                      <Link
                        href={item.link}
                        isExternal
                        style={{ textDecoration: "none" }}
                        variant="subtle-link"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <Link
                        key={idx}
                        as={NextLink}
                        href={item.link}
                        style={{ textDecoration: "none" }}
                        variant="subtle-link"
                        passHref
                        shallow
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
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
