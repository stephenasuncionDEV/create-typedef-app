import type { FC } from "react";
import NextLink from "next/link";
import { Flex, CloseButton, Text, HStack, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNotification } from "@/hooks/useNotification";

export interface NotificationProps {
  title: string;
  description: string;
  activate: boolean;
  action: string;
  callback?: () => void;
  href?: string;
}

const Notification: FC<NotificationProps> = ({
  title,
  description,
  activate,
  action,
  callback,
  href,
}) => {
  const { isVisible, close } = useNotification();

  if (!isVisible || !activate) return null;

  return (
    <motion.div
      initial={{ opacity: 0, right: 0 }}
      animate={{ opacity: 1, right: 20 }}
      transition={{ duration: 1 }}
      style={{
        position: "absolute",
        top: "5",
        right: "5",
        zIndex: "3",
      }}
    >
      <Flex
        p="1em"
        bg="#141627"
        borderRadius="10px"
        maxW="450px"
        w="full"
        border="1px solid #30363D"
      >
        <Flex flexDir="column">
          <Text fontSize="sm" fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="sm" color="whiteAlpha.700">
            {description}
          </Text>
          <HStack mt=".5em">
            <Button variant="transparent" size="sm" onClick={close}>
              Skip
            </Button>
            {callback ? (
              <Button
                variant="transparent"
                size="sm"
                color="blue.500"
                onClick={callback}
              >
                {action}
              </Button>
            ) : (
              <NextLink href={href ?? "/"} passHref shallow>
                <Button
                  variant="transparent"
                  size="sm"
                  color="blue.500"
                  onClick={callback}
                >
                  {action}
                </Button>
              </NextLink>
            )}
          </HStack>
        </Flex>
        <CloseButton onClick={close} />
      </Flex>
    </motion.div>
  );
};

export default Notification;
