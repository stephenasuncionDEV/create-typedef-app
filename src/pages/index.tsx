import type { NextPage } from "next";
import NextLink from "next/link";
import { Heading, Center, Button, VStack, Text, Flex } from "@chakra-ui/react";
import Meta from "@/components/Meta";
import Navbar from "@/components/Navbar";
import { navbarData } from "@/config/navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Meta title="create-typedef-app" />
      <Flex flexDir="column" minH="100vh">
        <Navbar data={navbarData} />
        <Center
          flex="1"
          bgGradient="radial-gradient(ellipse 80% 50% at 50% -20%,rgba(128,38,198,.15),rgba(255,255,255,0))"
        >
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
      </Flex>
    </div>
  );
};

export default Home;
