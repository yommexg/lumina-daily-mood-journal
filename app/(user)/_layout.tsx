import { Stack, Tabs } from "expo-router";

export default function UserLayout() {
  return (
    <Stack>
      <Tabs.Screen
        name="index" // This is the home
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
