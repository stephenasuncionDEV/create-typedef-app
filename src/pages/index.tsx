import type { NextPage } from "next";
import NextLink from "next/link";
import { Heading, Center, Button, VStack, Text, Flex } from "@chakra-ui/react";
import Meta from "@/components/Meta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home: NextPage = () => {
  return (
    <div>
      <Meta title="create-typedef-app" />
      <Flex flexDir="column" minH="100vh">
        <Navbar />
        <Center
          as="main"
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
                textAlign="center"
              >
                typedef
              </Text>
              -app
            </Heading>
            <NextLink href="/auth" passHref>
              <Button variant="gradient">Get Started 🚀</Button>
            </NextLink>
          </VStack>
        </Center>
      </Flex>
      <Footer />
    </div>
  );
};

export default Home;
