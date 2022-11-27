import type { NextPage } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import { Text, Center, Heading } from "@chakra-ui/react";
import Meta from "@/components/Meta";

const Error: NextPage = () => {
  return (
    <Center as="main" flexDir="column" minH="100vh">
      <Meta title="404" />
      <Center flexDir="column">
        <NextImage
          src="/assets/images/logo.svg"
          alt="Template Logo"
          width={50}
          height={50}
          quality={100}
          blurDataURL="https://via.placeholder.com/300/26"
          placeholder="blur"
        />
        <Heading as="h1">404</Heading>
        <Text fontSize="10pt">
          Page cannot be found. Go back to{" "}
          <NextLink href="/" style={{ color: "#3182ce" }}>
            landing
          </NextLink>{" "}
          page.
        </Text>
      </Center>
    </Center>
  );
};

export default Error;
