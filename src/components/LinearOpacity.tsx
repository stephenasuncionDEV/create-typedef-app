import type { FC } from "react";
import { Box } from "@chakra-ui/react";

export interface LinearOpacityProps {
  point?: number;
}

const LinearOpacity: FC<LinearOpacityProps> = ({ point = 10 }) => {
  return (
    <Box
      position="absolute"
      bgGradient={`linear(to-r, #0C0C0E 0%, #0C0C0E ${point}%, rgba(0,0,0,0) 100%)`}
      width="full"
      height="full"
      flex="1"
    />
  );
};

export default LinearOpacity;
