import { FC, useRef, MutableRefObject } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import NextImage from "next/image";
import NextLink from "next/link";
import { getProviders, signIn } from "next-auth/react";
import { AvailableProviderType } from "next-auth/providers";
import { LiteralUnion, AvailableSafeProvider } from "next-auth/react";
import {
  Center,
  Button,
  VStack,
  Wrap,
  Flex,
  Heading,
  Text,
  Input,
  SlideFade,
  Divider,
} from "@chakra-ui/react";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";
import Meta from "@/components/Meta";
import { useAuth } from "@/hooks/useAuth";

export interface SignInProps {
  providers: Record<LiteralUnion<AvailableProviderType>, AvailableSafeProvider>;
}

const SignIn: FC<SignInProps> = ({ providers }) => {
  const router = useRouter();
  const {
    query: { auth },
    isFallback,
  } = router;
  const isLogin = auth === "login";
  const isRegister = auth === "register";
  const nameInput = useRef() as MutableRefObject<HTMLInputElement>;
  const emailInput = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordInput = useRef() as MutableRefObject<HTMLInputElement>;
  const { authenticate } = useAuth();

  return (
    <Center minH="100vh">
      <Meta title={isLogin ? "Login" : "Register"} />
      <SlideFade in={!isFallback} offsetY="50px">
        <Wrap spacing="8em">
          {isRegister && (
            <>
              <Flex flexDir="column" alignItems="center">
                <Heading as="h2" fontSize="14pt">
                  Advertisement Here
                </Heading>
              </Flex>
              <Divider
                orientation="vertical"
                h="480px"
                className="vertical-divider"
              />
            </>
          )}
          <Flex flexDir="column" alignItems="center">
            <NextImage
              src="/assets/images/logo.svg"
              alt="Template Logo"
              width={50}
              height={50}
              quality={100}
              blurDataURL="https://via.placeholder.com/300/26"
              placeholder="blur"
            />
            <Heading as="h1" fontSize="18pt" mt="1em">
              {isLogin ? "Login to Typedef" : "Create your account"}
            </Heading>
            <Wrap spacing="1em" borderRadius="md" justify="center" mt="2em">
              {Object.values(providers)
                .filter((provider) => provider.id !== "credentials")
                .map((provider) => (
                  <div key={provider.name} style={{ minWidth: "135.73px" }}>
                    <Button
                      onClick={() => signIn(provider.id)}
                      leftIcon={
                        {
                          github: <FaGithub fontSize="16pt" />,
                          google: <FaGoogle fontSize="16pt" />,
                          credentials: undefined,
                        }[provider.id]
                      }
                      gap=".75em"
                      p="1.5em"
                      variant="outline"
                    >
                      <span style={{ fontSize: "10pt" }}>{provider.name}</span>
                    </Button>
                  </div>
                ))}
            </Wrap>
            <Text variant="subtle" mt="1.5em">
              or
            </Text>
            <VStack
              as="form"
              w="full"
              mt="1.5em"
              spacing="1em"
              onSubmit={(e) => {
                e.preventDefault();
                authenticate({
                  name: nameInput.current.value.trim(),
                  email: emailInput.current.value.trim(),
                  password: passwordInput.current.value.trim(),
                  type: isLogin ? "login" : "register",
                });
              }}
            >
              {isRegister && (
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  size="lg"
                  fontSize="10pt"
                  ref={nameInput}
                />
              )}
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                size="lg"
                fontSize="10pt"
                ref={emailInput}
              />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                size="lg"
                fontSize="10pt"
                ref={passwordInput}
              />
              <Button
                variant="outline"
                size="lg"
                w="full"
                fontSize="10pt"
                bg="whiteAlpha.200"
                _hover={{
                  bg: "whiteAlpha.300",
                }}
                type="submit"
              >
                {isLogin ? "Login" : "Create account"}
              </Button>
            </VStack>
            {isRegister && (
              <Text
                fontSize="9pt"
                mt="1em"
                variant="subtle"
                maxW="170px"
                textAlign="center"
              >
                By continuing you agree to our{" "}
                <NextLink
                  href="/about/terms"
                  style={{ color: "#3182ce" }}
                  shallow
                  passHref
                >
                  Terms of Service
                </NextLink>
              </Text>
            )}
            <Text fontSize="10pt" mt="2em">
              {isLogin ? "Dont have an account?" : "Already have an account?"}{" "}
              <NextLink
                href={isLogin ? "/auth/register" : "/auth/login"}
                style={{ color: "#3182ce" }}
                shallow
                passHref
              >
                {isLogin ? "Sign Up" : "Login"}
              </NextLink>
            </Text>
          </Flex>
        </Wrap>
      </SlideFade>
    </Center>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
