import { FC } from "react";
import { GetServerSidePropsContext } from "next";
import NextImage from "next/image";
import { getProviders, signIn } from "next-auth/react";
import { AvailableProviderType } from "next-auth/providers";
import { LiteralUnion, AvailableSafeProvider } from "next-auth/react";
import {
  Center,
  Button,
  VStack,
  HStack,
  Wrap,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaGoogle } from "@react-icons/all-files/fa/FaGoogle";

export interface SignInProps {
  providers: Record<LiteralUnion<AvailableProviderType>, AvailableSafeProvider>;
}

const SignIn: FC<SignInProps> = ({ providers }) => {
  return (
    <Center minH="100vh">
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
          Log in to Typedef
        </Heading>
        <Wrap p="2em" spacing="1em" borderRadius="md" justify="center">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ minWidth: "135.73px" }}>
              <Button
                onClick={() => signIn(provider.id)}
                leftIcon={
                  {
                    github: <FaGithub fontSize="16pt" />,
                    google: <FaGoogle fontSize="16pt" />,
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
      </Flex>
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
