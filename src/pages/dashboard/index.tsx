import type { NextPage } from "next";
import NextImage from "next/image";
import { signOut } from "next-auth/react";
import { Center, Button, Spinner, Text, Heading } from "@chakra-ui/react";
import { useAuthData } from "@/hooks/auth/useAuthData";
import Meta from "@/components/Meta";

const Dashboard: NextPage = () => {
  const { session, isLoading } = useAuthData();

  console.log(session);

  if (isLoading) {
    return (
      <Center as="main" flexDir="column" minH="100vh">
        <Spinner />
      </Center>
    );
  }

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
        <Heading as="h1">Welcome, </Heading>
        <Text fontSize="10pt">Thanks for using create-typedef-app</Text>
        <Button variant="primary" onClick={() => signOut()}>
          Logout
        </Button>
      </Center>
    </Center>
  );
};

export default Dashboard;
