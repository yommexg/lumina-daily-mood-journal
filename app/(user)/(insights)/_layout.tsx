import { Stack, Tabs } from "expo-router";

export default function InsightLayout() {
  return (
    <Stack>
      <Tabs.Screen
        name="index" // This is the Insight Page
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
