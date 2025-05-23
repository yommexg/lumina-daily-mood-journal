import { registerForPushNotificationsAsync } from "@/config/notification";
import * as Notifications from "expo-notifications";
import { createContext, ReactNode, useEffect, useState } from "react";

type NotificationContextType = {
  notification: Notifications.Notification | undefined;
  expoPushToken: string | null | undefined;
};

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null | undefined>(
    null
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => token && setExpoPushToken(token))
      .catch((error: any) => console.log(error));

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, expoPushToken }}>
      {children}
    </NotificationContext.Provider>
  );
};
