import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import Meta from "@/components/Meta";

const Home: NextPage = () => {
  return (
    <Flex as="main" flexDir="column">
      <Meta title="Minting Website" />
    </Flex>
  );
};

export default Home;
