import { useState } from "react";

export const useNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  const close = () => {
    setIsVisible(false);
  };

  return {
    isVisible,
    close,
  };
};
