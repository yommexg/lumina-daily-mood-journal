import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { toastConfig } from "@/config/toastConfig";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const googleAuthClientID = process.env.EXPO_PUBLIC_GOOGLE_AUTH_CLIENT_ID;

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  if (!loaded) {
    return null;
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
