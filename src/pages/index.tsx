import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { Heading, Center, Button, VStack } from "@chakra-ui/react";
import Meta from "@/components/Meta";

const Home: NextPage = () => {
  return (
    <Center as="main" flexDir="column" minH="100vh">
      <Meta title="Website" />
      <VStack spacing="2em">
        <Heading as="h1">
          create-<span style={{ color: "rgb(117,63,229)" }}>typedef</span>-app
        </Heading>
        <Button variant="primary" onClick={() => signIn()}>
          Sign In
        </Button>
      </VStack>
    </Center>
  );
};

export default Home;
