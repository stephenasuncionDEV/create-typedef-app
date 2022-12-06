import type { NextPage } from "next";
import NextLink from "next/link";
import { Heading, Center, Button, VStack } from "@chakra-ui/react";
import Meta from "@/components/Meta";

const Home: NextPage = () => {
  return (
    <Center as="main" flexDir="column" minH="100vh">
      <Meta title="Website" />
      <VStack spacing="2em" className="backlight" borderRadius="10px" p="2em">
        <Heading as="h1">
          create-
          <span style={{ color: "rgb(117,63,229)" }}>typedef</span>
          -app
        </Heading>
        <NextLink href="/auth/login" passHref>
          <Button variant="outline-light">Get Started 🚀</Button>
        </NextLink>
      </VStack>
    </Center>
  );
};

export default Home;
