import { SafeAreaView } from "react-native-safe-area-context";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { primaryColor } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <Header />
        <ExternalLink
          href="https://expo.dev"
          style={{ color: primaryColor, marginVertical: 20, fontSize: 16 }}>
          Visit Expo.dev
        </ExternalLink>
        <Collapsible title="Section 1: Introduction">
          <ThemedText>
            This is the content for section 1. You can place any text or
            components here.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Section 2: Details">
          <ThemedText>
            Here are more details about the topic. You can even nest other
            components if needed.
          </ThemedText>
        </Collapsible>

        <Collapsible title="Section 3: More Info">
          <ThemedText>
            This is another collapsible section. Tapping the title will toggle
            visibility.
          </ThemedText>
        </Collapsible>
      </ThemedView>
    </SafeAreaView>
  );
}
