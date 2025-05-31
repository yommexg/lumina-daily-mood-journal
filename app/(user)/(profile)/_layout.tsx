import { Stack, Tabs } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Tabs.Screen
        name="index" // This is the Profile Page
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
