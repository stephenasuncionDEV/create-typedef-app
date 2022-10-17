import type { NextPage } from "next";
import { Flex, Link } from "@chakra-ui/react";
import Meta from "@/components/Meta";

const Home: NextPage = () => {
  return (
    <Flex as="main" flexDir="column">
      <Meta title="Website" />
      <Link
        href="https://github.com/stephenasuncionDEV/next-js-template"
        isExternal
        variant="link"
      >
        Github Repository
      </Link>
    </Flex>
  );
};

export default Home;
