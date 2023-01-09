import type { FC } from "react";
import NextLink from "next/link";
import { Flex, CloseButton, Text, HStack, Button } from "@chakra-ui/react";
import { motion, MotionStyle } from "framer-motion";
import { useNotification } from "@/hooks/useNotification";

export type NotificationPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface NotificationPositions {
  [key: string]: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
}

export interface NotificationProps {
  title: string;
  description: string;
  activate: boolean;
  action: string;
  callback?: () => void;
  href?: string;
  position?: NotificationPosition;
}

const positions: NotificationPositions = {
  "top-left": {
    top: 0,
    left: 0,
  },
  "top-right": {
    top: 0,
    right: 0,
  },
  "bottom-left": {
    bottom: 0,
    left: 0,
  },
  "bottom-right": {
    bottom: 0,
    right: 0,
  },
};

const Notification: FC<NotificationProps> = ({
  title,
  description,
  activate,
  action,
  callback,
  href,
  position = "top-right",
}) => {
  const { isVisible, close } = useNotification();

  if (!isVisible || !activate) return null;

  const style: MotionStyle = {
    position: "absolute",
    zIndex: "3",
    ...positions[position],
  };

  return (
    <motion.div
      initial={{ opacity: 0, right: 0 }}
      animate={{ opacity: 1, right: 20 }}
      transition={{ duration: 1 }}
      style={style}
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
