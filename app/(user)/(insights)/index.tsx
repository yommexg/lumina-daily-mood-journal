import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";

export default function InsightScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}>
          <ThemedText style={{ fontWeight: "bold", fontSize: 20 }}>
            Insight Page
          </ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
