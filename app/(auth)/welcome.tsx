import { Image } from "expo-image";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function WelcomeScreen() {
  return (
    <ThemedView
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 20,
        gap: 20,
      }}>
      <Image
        source={require("@/assets/images/icon.png")}
        style={{
          width: 200,
          height: 200,
          borderRadius: 20,
        }}
        contentFit="cover"
      />

      <ThemedText
        type="primary"
        style={{
          fontSize: 30,
        }}>
        Welcome to Lumina
      </ThemedText>

      <ThemedText style={{ textAlign: "center", fontStyle: "italic" }}>
        A simple and calming daily mood journal that helps you track your
        emotions, triggers, and habits to better understand your mental
        well-being.
      </ThemedText>
    </ThemedView>
  );
}
