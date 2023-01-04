import type { NextPage } from "next";
import { useMemo } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Meta from "@/components/Meta";
import { useRouter } from "next/router";

enum VerifyStatus {
  CHECK = "check",
  SUCCESS = "success",
  INVALID = "invalid",
}

type VerifyMessage = {
  title: string;
  subtitle: string;
};

type VerifyMessages = {
  [key in VerifyStatus]: VerifyMessage;
};

const messages: VerifyMessages = {
  check: {
    title: "Check your Email",
    subtitle:
      "It looks like you haven't verified your email address. Please check your email inbox or junk folder.",
  },
  success: {
    title: "Successfuly Verified",
    subtitle:
      "You have successfuly verified your email address. You can now view the dashboard.",
  },
  invalid: {
    title: "Authentication Failed",
    subtitle:
      "It looks like you may have clicked on an invalid email verification link. Please close this window and try authenticating again.",
  },
};

const Verify: NextPage = () => {
  const router = useRouter();
  const status = ((router.query.status as string) ?? "check") as VerifyStatus;
  const message = useMemo(() => {
    return messages[status];
  }, [status]);

  return (
    <div>
      <Meta title="Verify | iMintify" />
      <Flex as="main" flexDir="column" minH="100vh">
        <Flex
          w="full"
          justifyContent="center"
          borderBottom="1px solid rgb(255,255,255,.1)"
        >
          <Flex maxW="1100px" w="full" p="1em">
            <NextLink href="/get-started" passHref shallow>
              <NextImage
                src="/assets/images/logo.png"
                alt={`${process.env.APP_NAME} Logo`}
                width={160}
                height={34}
                quality={100}
                placeholder="blur"
                blurDataURL="https://picsum.photos/160/34"
              />
            </NextLink>
          </Flex>
        </Flex>
        <Center flexDir="column" h="full" flex="1">
          <VStack spacing="2em" maxW="560px" textAlign="center">
            <Heading as="h1" fontSize="48px">
              {message.title}
            </Heading>
            <Text mt="3em">{message.subtitle}</Text>
          </VStack>
        </Center>
      </Flex>
    </div>
  );
};

export default Verify;
