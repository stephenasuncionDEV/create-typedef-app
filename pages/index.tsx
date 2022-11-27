import type { NextPage } from "next";
import { Center, Button, VStack, Spinner } from "@chakra-ui/react";
import Meta from "@/components/Meta";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading)
    return (
      <Center as="main" flexDir="column" minH="100vh">
        <Spinner />
      </Center>
    );

  if (session) {
    return (
      <Center as="main" flexDir="column" minH="100vh">
        <Meta title="Website" />
        <VStack>
          <Button variant="primary" onClick={() => signOut()}>
            Logout
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Center as="main" flexDir="column" minH="100vh">
      <Meta title="Website" />
      <VStack>
        <Button variant="primary" onClick={() => signIn()}>
          Sign In
        </Button>
      </VStack>
    </Center>
  );
};

export default Home;
