import type { NextPage } from "next";
import NextImage from "next/image";
import { signOut } from "next-auth/react";
import {
  Center,
  Button,
  Spinner,
  Text,
  Heading,
  Tag,
  TagLabel,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useUserSettings } from "@/hooks/user/useUserSettings";
import Meta from "@/components/Meta";
import UserSettingsModal from "@/components/UserSettingsModal";

const Dashboard: NextPage = () => {
  const { session, isLoading, isUnAuthenticated } = useAuth();
  const { toggleUserSettings } = useUserSettings();

  if (isLoading || isUnAuthenticated) {
    return (
      <Center minH="100vh">
        <HStack spacing=".75em">
          <Spinner color="#753FE5" size="lg" thickness="5px" />
          <Heading as="h1" fontSize="10pt" fontWeight="500">
            Loading..<span className="blink">.</span>
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <Center as="main" flexDir="column" minH="100vh">
      <Meta title="Dashboard" />
      <UserSettingsModal />
      <Center flexDir="column">
        <NextImage
          src="/assets/images/icon.png"
          alt={`${process.env.APP_NAME} Icon`}
          width={50}
          height={50}
          quality={100}
          blurDataURL="https://via.placeholder.com/50/50"
          placeholder="blur"
        />
        <Heading as="h1" fontSize="22pt">
          Welcome {session?.user?.name},{" "}
        </Heading>
        <Text fontSize="10pt" variant="subtle">
          Thanks for using create-typedef-app
        </Text>
        <Tag mt="1em" size="sm">
          <TagLabel>
            {session?.user?.address ??
              session?.user?.email ??
              session?.user?.guestId}
          </TagLabel>
        </Tag>
        <HStack mt="2em">
          <Button variant="outline" size="sm" onClick={toggleUserSettings}>
            Settings
          </Button>
          <Button variant="outline" onClick={() => signOut()} size="sm">
            Logout
          </Button>
        </HStack>
      </Center>
    </Center>
  );
};

export default Dashboard;
