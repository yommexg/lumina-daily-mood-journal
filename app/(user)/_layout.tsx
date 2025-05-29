import { HapticTab } from "@/components/HapticTab";
import { Tabs } from "expo-router";

export default function UserLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index" // This is the home
        options={{
          headerShown: false,
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
    </Tabs>
  );
}
