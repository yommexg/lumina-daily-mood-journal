import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function JournalScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <ThemedText>This is the Journal Page</ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
