import { Stack, Tabs } from "expo-router";

export default function JournalLayout() {
  return (
    <Stack>
      <Tabs.Screen
        name="index" // This is the Journal Page
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
