import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { toastConfig } from "@/config/toastConfig";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

const googleAuthClientID = process.env.EXPO_PUBLIC_GOOGLE_AUTH_CLIENT_ID;

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
      </ThemeProvider>
    </NotificationProvider>
  );
}
