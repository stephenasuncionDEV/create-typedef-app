import type { NextPage } from "next";
import { useRef, MutableRefObject } from "react";
import { GetServerSidePropsContext } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import { getProviders } from "next-auth/react";
import {
  Center,
  Button,
  VStack,
  Flex,
  Heading,
  Text,
  Input,
  SlideFade,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import WalletModal from "@/components/WalletModal";
import { useAuthForm } from "@/hooks/auth/useAuthForm";
import Meta from "@/components/Meta";

const Auth: NextPage = () => {
  const emailInput = useRef() as MutableRefObject<HTMLInputElement>;
  const {
    isLoggingIn,
    errors,
    emailLogin,
    guestLogin,
    web3Login,
    isWalletModalOpen,
    setIsWalletModalOpen,
  } = useAuthForm();

  return (
    <Center minH="100vh">
      <Meta title={`Authentication | ${[process.env.APP_NAME]}`} />
      <WalletModal
        isLoggingIn={isLoggingIn}
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        web3Login={web3Login}
      />
      <SlideFade in={true} offsetY="50px">
        <Flex flexDir="column" alignItems="center" maxW="288px">
          <NextLink href="/">
            <NextImage
              src="/assets/images/icon.png"
              alt={`${process.env.APP_NAME} Icon`}
              width={40}
              height={40}
              quality={100}
              placeholder="blur"
              blurDataURL="https://picsum.photos/40/40"
            />
          </NextLink>
          <Heading as="h1" fontSize="18pt" mt="1em">
            Welcome back
          </Heading>
          <VStack
            as="form"
            w="full"
            mt="1.5em"
            spacing="1em"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormControl isInvalid={!!errors?.email?.length}>
              <Input
                ref={emailInput}
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                size="lg"
                fontSize="10pt"
              />
              {errors?.email && (
                <FormErrorMessage>{errors?.email}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              variant="outline-light"
              size="lg"
              w="full"
              fontSize="10pt"
              type="submit"
              disabled={isLoggingIn}
              isLoading={isLoggingIn}
              loadingText="Logging In"
              onClick={() => emailLogin(emailInput.current.value)}
            >
              Login with Email
            </Button>
            <Text variant="subtle">or</Text>
            <Button
              variant="outline-light"
              size="lg"
              w="full"
              fontSize="10pt"
              type="submit"
              disabled={isLoggingIn}
              isLoading={isLoggingIn}
              loadingText="Logging In"
              onClick={() => setIsWalletModalOpen(true)}
            >
              Login with Crypto Wallet
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              w="full"
              fontSize="10pt"
              type="submit"
              disabled={isLoggingIn}
              isLoading={isLoggingIn}
              loadingText="Logging In"
              onClick={guestLogin}
            >
              Login as Guest
            </Button>
          </VStack>
          <Text fontSize="9pt" mt="1em" variant="subtle" textAlign="center">
            By continuing you agree to our{" "}
            <Link href="/about/terms" variant="link" isExternal>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/about/privacy" variant="link" isExternal>
              Privacy Policy
            </Link>
            .
          </Text>
        </Flex>
      </SlideFade>
    </Center>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext /* eslint-disable-line @typescript-eslint/no-unused-vars */,
) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default Auth;
