import type { NextPage } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import { Flex } from "@chakra-ui/react";
import Meta from "@/components/Meta";
import ImageLogo from "../public/assets/images/logo.png";

const Home: NextPage = () => {
  return (
    <Flex as="main" flexDir="column">
      <Meta title="Website" />
      <NextImage src={ImageLogo} alt="Logo" placeholder="blur" />
      <NextLink
        href="https://github.com/stephenasuncionDEV/next-js-template"
        target="_blank"
      >
        Github Repository
      </NextLink>
    </Flex>
  );
};

export default Home;
