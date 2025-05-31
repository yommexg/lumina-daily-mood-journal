import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import Spinner from "@/components/Spinner";
import { toastConfig } from "@/config/toastConfig";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { useUserStore } from "@/store/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const googleAuthClientID = process.env.EXPO_PUBLIC_GOOGLE_AUTH_CLIENT_ID;

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { getUser } = useUserStore();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const success = await getUser(token);
        if (success) {
          router.navigate("/(user)/(home)");
        } else {
          router.navigate("/(auth)/login");
        }
      }
    };

    checkToken();
  }, [getUser]);

  if (!loaded) {
    return <Spinner />;
  }

  GoogleSignin.configure({
    webClientId: googleAuthClientID,
    offlineAccess: true,
  });

  return (
    <NotificationProvider>
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(user)"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </NotificationProvider>
  );
}
