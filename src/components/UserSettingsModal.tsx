import type { FC } from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Button,
  Text,
  Center,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  HStack,
  Box,
  Badge,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { capitalize } from "@/common/utils";
import { useUserSettings } from "@/hooks/user/useUserSettings";
import { trpc } from "@/server/trpc";

const UserSettingsModal: FC = () => {
  const {
    isUserSettingsOpen,
    isSaving,
    toggleUserSettings,
    saveUser,
    name,
    setName,
    email,
    setEmail,
    deleteUser,
  } = useUserSettings();

  const user = trpc.user.getUser.useQuery().data;

  return (
    <Modal
      isOpen={isUserSettingsOpen}
      onClose={toggleUserSettings}
      isCentered
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          User Settings
          <Text variant="subtle">
            Please select your wallet to login to your iMintify account.
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" gap="1em" alignItems="flex-start">
          <Center
            p="1em"
            border="1px solid rgba(255,255,255,.1)"
            borderRadius="5px"
          >
            <NextImage
              src={user?.image ?? "/assets/images/icon.png"}
              alt={name}
              width={100}
              height={100}
              quality={100}
            />
          </Center>
          <Flex flexDir="column">
            <Text>Name</Text>
            <Editable
              value={user?.name ?? name}
              fontSize="9pt"
              color="gray.500"
              isDisabled={!!user?.name}
            >
              <EditablePreview />
              <EditableInput
                onChange={(e) => {
                  if (e.target.value.length < 1) return;
                  setName(e.target.value);
                }}
              />
            </Editable>
            <Text mt="1em">Email</Text>
            <Editable
              value={user?.email ?? email}
              fontSize="9pt"
              color="gray.500"
              isDisabled={!!user?.email}
            >
              <EditablePreview />
              <EditableInput
                type="email"
                onChange={(e) => {
                  if (e.target.value.length < 1) return;
                  setEmail(e.target.value);
                }}
              />
            </Editable>
            {user?.guestId && (
              <>
                <Text mt="1em">Guest ID</Text>
                <Tag>
                  <TagLabel>{user.guestId}</TagLabel>
                </Tag>
              </>
            )}
            {user?.address && (
              <>
                <Text mt="1em">Address</Text>
                <Text variant="subtle">{user.address}</Text>
                <Text mt=".5em">Wallet</Text>
                <Text variant="subtle">{capitalize(user?.wallet ?? "")}</Text>
              </>
            )}
            <HStack mt="1em">
              <Text>
                {user?.points} {process.env.APP_NAME} Points
              </Text>
              <NextLink href="/payments" passHref shallow>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.2 }}
                >
                  <Badge
                    colorScheme="green"
                    cursor="pointer"
                    onClick={toggleUserSettings}
                  >
                    +
                  </Badge>
                </motion.div>
              </NextLink>
            </HStack>
            <Text variant="subtle">
              Get points to unlock special features throughout the site.
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="space-between">
          {user?.guestId ? (
            <Box maxW="300px">
              <Text variant="subtle">
                You are currently logged in as a guest. Your account will be
                deleted when you logout.
              </Text>
            </Box>
          ) : (
            <Button
              variant="danger"
              size="sm"
              onClick={deleteUser}
              isDisabled={isSaving}
            >
              Delete
            </Button>
          )}
          <HStack>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleUserSettings}
              isDisabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              onClick={saveUser}
              isDisabled={isSaving}
              isLoading={isSaving}
              loadingText="Saving"
            >
              Save
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserSettingsModal;
