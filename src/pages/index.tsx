import type { NextPage } from "next";
import NextLink from "next/link";
import { Heading, Center, Button, VStack, Text } from "@chakra-ui/react";
import Meta from "@/components/Meta";

const Home: NextPage = () => {
  return (
    <Center as="main" flexDir="column" minH="100vh">
      <Meta title="Website" />
      <VStack spacing="2em" borderRadius="10px" p="2em">
        <Heading as="h1">
          create-
          <Text
            as="span"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            typedef
          </Text>
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
