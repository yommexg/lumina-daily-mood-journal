import { useContext } from "react";

import { NotificationContext } from "@/providers/NotificationProvider";

export const usePushNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "usePushNotification must be used within a Notification Provider"
    );
  }
  return context;
};
