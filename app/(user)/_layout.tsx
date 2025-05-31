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
          borderTopWidth: 0,
        },
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(journal)"
        options={{
          headerShown: false,
          title: "Journal",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="book"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(insights)"
        options={{
          headerShown: false,
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="bar-chart"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
