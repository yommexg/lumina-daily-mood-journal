import { Stack, Tabs } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Tabs.Screen
        name="index" // This is the login
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
