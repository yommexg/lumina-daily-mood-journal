import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { Colors, primaryColor } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function UserLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: themeColors.icon,
        tabBarStyle: {
          backgroundColor: themeColors.barBackground,
        },
      }}>
      <Tabs.Screen
        name="index" // This is the home
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
