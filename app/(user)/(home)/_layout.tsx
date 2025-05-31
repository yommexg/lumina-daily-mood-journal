import { Stack, Tabs } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Tabs.Screen
        name="index" // This is the Home Page
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
